import { Router } from 'express';

import ToDoControllerRouter from '@/controllers/APIv1/ToDoControllerRouter';

const router = Router();

// Aggregates all controllers bellow under the same route '/api/v1'
router.use('/toDo', ToDoControllerRouter);

export default router;
