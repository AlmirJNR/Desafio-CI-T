import dotenv from 'dotenv';
import { before } from 'mocha';
import { Builder, By, Key, until, WebDriver, WebElement } from 'selenium-webdriver';

// Call environment variables
dotenv.config();

/** Stores the text that its going to be searched by the tests */
let searchText: string;

/** Stores the category that its going to be searched in by the tests */
let searchCategory: string;

/** Stores the url that the test should access */
const webUrl: string = process.env.WEB_URL;

/** Stores the web driver that the test should access to open an browser
 * use the function bellow to chage it's value
 * @function setWebDriver(browser:string) */
let driver: WebDriver;

/** Changes the web driver that the test should access to open an browser
 * @param browser: 'chrome'
 * @param browser: 'firefox'
 * @param browser: 'edge'
 * @param browser: 'opera'
 * @param browser: 'safari' mac only
 *
 * @param host: 'localhost'
 * @param host: 'dockerhost' */
async function setWebDriver(browser:string, host: string) {
	if (host.match('dockerhost')) {
		driver = await new Builder().forBrowser(browser).usingServer('http://selenium-hub:4444/wd/hub').build();
	} else {
		driver = await new Builder().forBrowser(browser).build();
	}
}

describe('Searching for "Science: Computers" in "Question" category', () => {
	before(async () => {
		searchText = process.env.WEB_SEARCH_TEXT_FIRST_STAGE;
		searchCategory = process.env.WEB_SEARCH_CATEGORY_FIRST_STAGE;
		await setWebDriver(process.env.WEB_BROWSER, process.env.HOST_ENV);
	});
	it('should return an error', async () => {
		try {
			await driver.get(webUrl);

			await (await driver.findElement(By.id('query'))).sendKeys(searchText);
			await (await driver.findElement(By.id('type'))).sendKeys(searchCategory);
			await (await driver.findElement(By.className('btn btn-sm btn-default'))).click();

			const alertElement: WebElement = await driver.findElement(By.xpath('//*[@id="page-top"]/div[2]/div'));

			await driver.wait(until.elementTextIs(alertElement, 'No questions found.'), 1000);

		} finally {
			await driver.quit();
		}
	});
});

describe('Searching for "Science: Computers" in "Category" category', () => {
	before(async () => {
		searchText = process.env.WEB_SEARCH_TEXT_SECOND_STAGE;
		searchCategory = process.env.WEB_SEARCH_CATEGORY_SECOND_STAGE;
		await setWebDriver(process.env.WEB_BROWSER, process.env.HOST_ENV);
	});
	it('should return a website with a table with 25 rows and a pagination controller on the bottom', async () => {
		try {
			await driver.get(webUrl);

			await (await driver.findElement(By.id('query'))).sendKeys(searchText);
			await (await driver.findElement(By.id('type'))).sendKeys(searchCategory);
			await (await driver.findElement(By.className('btn btn-sm btn-default'))).click();

			const tableCells: WebElement[] = await driver.findElements(By.xpath('//*[@id="page-top"]/div[2]/table/tbody/tr'));

			if (tableCells.length !== 25) {
				throw new Error(`table length is diferent than expected (expected 25 rows but received ${tableCells.length} rows)`);
			} else {
				await driver.findElement(By.className('pagination pagination-lg'));
			}

		} finally {
			await driver.quit();
		}
	});
});

describe('Searching for "mets11rap" in "User" category', () => {
	before(async () => {
		searchText = process.env.WEB_SEARCH_TEXT_THIRD_STAGE;
		searchCategory = process.env.WEB_SEARCH_CATEGORY_THIRD_STAGE;
		await setWebDriver(process.env.WEB_BROWSER, process.env.HOST_ENV);
	});
	it('should return a website with a table with 24 questions created by the user "mets11rap"', async () => {
		try {
			await driver.get(webUrl);

			await (await driver.findElement(By.id('query'))).sendKeys(searchText);
			await (await driver.findElement(By.id('type'))).sendKeys(searchCategory);
			await (await driver.findElement(By.className('btn btn-sm btn-default'))).click();

			const tableCells: WebElement[] = await driver.findElements(By.xpath('//*[@id="page-top"]/div[2]/table/tbody/tr'));

			if (tableCells.length !== 24) {
				throw new Error(`table length is diferent than expected (expected 24 rows but received ${tableCells.length} rows)`);
			} else {
				const userProfile: WebElement = await driver.findElement(By.xpath('//*[@id="page-top"]/div[2]/table/tbody/tr[1]/td[6]/a'));
				const userProfileName = await userProfile.getText();

				if (userProfileName !== 'mets11rap') {
					throw new Error(`user name is different than expected (expected mets11rap but received ${userProfileName})`);
				}
			}

		} finally {
			await driver.quit();
		}
	});
});
