import Express from 'express';
import Cors from 'cors';
import SCQuestionController from '../src/controllers/SCQuestionController.js'

const app = Express();

app.use(Cors());
app.use(Express.json());

app.use('/api/v1/search', SCQuestionController);

//Default route api response
app.get('/api/v1/', async (request, response) => {
	response.send('<h1>E-commerce Api</h1>');
});

//Serves Api on standard 8080 port
app.listen(8080, () => {
	console.log('Server open and listening on http://localhost:8080');
});

export default app;
