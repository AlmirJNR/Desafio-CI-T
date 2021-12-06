import { ToDoTable } from '@/utils/Constants';

import { knexConnection } from '@/services/database/DatabaseService';

import { ToDo } from '@/types/model/ToDo';

export async function getAllToDos(): Promise<ToDo[]|undefined> {
  return knexConnection()
    .select<ToDo[]>()
    .from(ToDoTable)
    .orderBy('id');
}
