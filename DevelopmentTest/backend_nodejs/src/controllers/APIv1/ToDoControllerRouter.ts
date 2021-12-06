import { Router } from 'express';

import ToDoGet from '@/controllers/APIv1/ToDoController/Get';
import ToDoPost from '@/controllers/APIv1/ToDoController/Post';
import ToDoPut from '@/controllers/APIv1/ToDoController/Put';
import ToDoDelete from '@/controllers/APIv1/ToDoController/Delete';

const router = Router();

// Aggregates all controllers bellow under the same route '/toDo'
router.use('/', ToDoGet);
router.use('/create', ToDoPost);
router.use('/update', ToDoPut);
router.use('/delete', ToDoDelete);

export default router;
