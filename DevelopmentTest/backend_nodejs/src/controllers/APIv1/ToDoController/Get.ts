import { Router } from 'express';

import { getAllToDos } from '@/services/ToDoService/Get';

const router = Router();

/** GET: returns all registered toDos */
router.get('/', async (request, response) => {
  const isSuccess = await getAllToDos();

  // Returns 404 if no ToDo is found within the database
  if (!isSuccess) {
    return response.sendStatus(404);
  }

  return response.json(isSuccess);
});

export default router;
