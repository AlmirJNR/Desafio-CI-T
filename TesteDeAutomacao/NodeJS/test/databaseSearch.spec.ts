import requestFrom from 'supertest';
import app from '../src/index.js';

describe('Database search for specific terms in search field', () => {
	describe('"Science: Computers" in Question search field', () => {
		it('should return a website indicating an error', (done) => {
			let specificSearch = 'Science: Computers';
			let category = 'Question';
			requestFrom(app)
				// .get('/api/v1/search/:specificSearch/:category')
				.get(`/api/v1/search/${specificSearch}/${category}`)
				.expect(302, done);
		});
	});
});
