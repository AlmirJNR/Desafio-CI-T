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
 *
 * @param local: 'localhost'
 * @param local: 'dockerhost' */
async function setWebDriver(browser:string, local: string) {
	if (local.match('localhost')) {
		driver = await new Builder().forBrowser(browser).usingServer('http://172.17.0.1:4444/wd/hub').build();
	} else {
		driver = await new Builder().forBrowser(browser).usingServer('http://localhost:4444/wd/hub').build();
	}
}

describe('Searching for "Science: Computers" in "Question" category', () => {
	before(async () => {
		searchText = process.env.WEB_SEARCH_TEXT_FIRST_STAGE;
		searchCategory = process.env.WEB_SEARCH_CATEGORY_FIRST_STAGE;
		await setWebDriver('chrome', 'localhost');
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
		await setWebDriver('chrome', 'localhost');
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
