import { Router } from 'express';

import { deleteAllToDos, deleteToDoById, deleteToDoList } from '@/services/ToDoService/Delete';

const router = Router();

/** DELETE: delete all ToDos */
router.delete('/all', async (request, response) => {
  const isSuccess = await deleteAllToDos();

  // Returns 500 if server wasn't able to delete all toDos
  if (!isSuccess) {
    return response.sendStatus(500);
  }

  return response.sendStatus(200);
});

/** DELETE: delete specific ToDo by id */
router.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const isSuccess = await deleteToDoById(Number(id));

  // Returns 404 if server wasn't able to delete all toDos
  if (!isSuccess) {
    return response.sendStatus(500);
  }

  return response.sendStatus(200);
});

/** DELETE: delete specific ToDo list */
router.post('/list', async (request, response) => {
  const { ids } = request.body;

  const isSuccess = await deleteToDoList(ids as number[]);

  // Returns 404 if server wasn't able to delete all toDos
  if (!isSuccess) {
    return response.sendStatus(500);
  }

  return response.sendStatus(200);
});

export default router;
