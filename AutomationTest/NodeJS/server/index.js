import express from 'express'

const app = express();

app.use(express.static('../mochawesome-report/'));

app.listen(8080, () => {
	console.log('mochawesome report log is open in http://localhost:8080');
});
