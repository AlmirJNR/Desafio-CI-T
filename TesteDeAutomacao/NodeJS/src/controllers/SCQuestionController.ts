import Router from 'express';

const router = Router();

router.get('/:specificSearch/:category', async (request, response) => {
	response.redirect(`https://opentdb.com/browse.php?query=
	${request.params.specificSearch
	.replace(':', '%3A')
	.replace(' ', '_')
	.replace('_', '+')}&type=${request.params.category}#`);
});

export default router;

//Science%3A+Computers
//Question
