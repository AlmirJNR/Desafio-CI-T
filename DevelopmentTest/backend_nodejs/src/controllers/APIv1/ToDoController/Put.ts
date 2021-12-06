import { Router } from 'express';

import {
  updateToDoById,
  updateToDoTextById,
  updateToDoFinishedById,
  updateToDoIsDateCreatedById,
  updateToDoIsDateFinishedById,
} from '@/services/ToDoService/Put';

const router = Router();

/** PUT: update all toDo information by id */
router.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { text, finished, dateCreated, dateFinished } = request.body;

  // Returns 400 if request body is incomplete
  if (!id || !text || !String(finished) || !dateCreated || !dateFinished) {
    return response.sendStatus(400);
  }

  const isSuccess = await updateToDoById(Number(id), text, Boolean(finished), new Date(dateCreated), new Date(dateFinished));

  // Returns 500 if server wasn't able to update the toDo
  if (!isSuccess) {
    return response.sendStatus(500);
  }

  return response.sendStatus(201);
});

/** PUT: update toDo text by id */
router.put('/text/:id/', async (request, response) => {
  const { id } = request.params;
  const { text } = request.body;

  // Returns 400 if request body is incomplete
  if (!id || !text) {
    return response.sendStatus(400);
  }

  const isSuccess = await updateToDoTextById(Number(id), text);

  // Returns 500 if server wasn't able to create an new toDo
  if (!isSuccess || isSuccess === 500) {
    return response.sendStatus(500);
  }

  return response.sendStatus(201);
});

/** PUT: update toDo finished situation by id */
router.put('/finished/:id/', async (request, response) => {
  const { id } = request.params;
  const { finished, dateFinished } = request.body;

  // Returns 400 if request body is incomplete
  if (!id || !String(finished) || !dateFinished) {
    return response.sendStatus(400);
  }

  const isSuccess = await updateToDoFinishedById(Number(id), Boolean(finished), new Date(dateFinished));

  // Returns 500 if server wasn't able to update the toDo
  if (!isSuccess) {
    return response.sendStatus(500);
  }

  return response.sendStatus(201);
});

/** PUT: update toDo date created by id */
router.put('/dateCreated/:id/', async (request, response) => {
  const { id } = request.params;
  const { dateCreated } = request.body;

  // Returns 400 if request body is incomplete
  if (!id || !dateCreated) {
    return response.sendStatus(400);
  }

  const isSuccess = await updateToDoIsDateCreatedById(Number(id), new Date(dateCreated));

  // Returns 500 if server wasn't able to update the toDo
  if (!isSuccess) {
    return response.sendStatus(500);
  }

  return response.sendStatus(201);
});

/** PUT: update toDo date finished by id */
router.put('/dateFinished/:id/', async (request, response) => {
  const { id } = request.params;
  const { dateFinished } = request.body;

  // Returns 400 if request body is incomplete
  if (!id || !dateFinished) {
    return response.sendStatus(400);
  }

  const isSuccess = await updateToDoIsDateFinishedById(Number(id), new Date(dateFinished));

  // Returns 500 if server wasn't able to update the toDo
  if (!isSuccess) {
    return response.sendStatus(500);
  }

  return response.sendStatus(201);
});

export default router;
