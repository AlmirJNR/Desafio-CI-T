import { Router } from 'express';

import { deleteAllToDos, deleteToDoById } from '@/services/ToDoService/Delete';
import { restartIdSequence } from '@/services/ToDoService/RestartSequence';

const router = Router();

/** DELETE: delete all ToDos */
router.delete('/all', async (request, response) => {
  const isSuccess = await deleteAllToDos();

  // Returns 500 if server wasn't able to delete all toDos
  if (!isSuccess) {
    return response.sendStatus(500);
  }

  restartIdSequence();
  return response.sendStatus(200);
});

/** DELETE: delete specific ToDo by id */
router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const isSuccess = await deleteToDoById(Number(id));

  // Returns 404 if server wasn't able to delete all toDos
  if (!isSuccess) {
    return response.sendStatus(404);
  }

  return response.sendStatus(200);
});

export default router;
