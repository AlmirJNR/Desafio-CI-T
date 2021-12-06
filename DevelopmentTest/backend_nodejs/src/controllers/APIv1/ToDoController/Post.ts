import { Router } from 'express';

import { createNewToDo } from '@/services/ToDoService/Post';

const router = Router();

/** POST: create an new toDo */
router.post('/', async (request, response) => {
  const { text, finished, dateCreated } = request.body;

  // Returns 400 if request body is incomplete
  if (!text || !String(finished) || !dateCreated) {
    return response.sendStatus(400);
  }

  const isSuccess = await createNewToDo(text, Boolean(finished), new Date(dateCreated));

  // Returns 500 if server wasn't able to create an new toDo
  if (!isSuccess) {
    return response.sendStatus(500);
  }

  return response.sendStatus(201);
});

export default router;
