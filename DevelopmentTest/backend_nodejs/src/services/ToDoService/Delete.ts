import { ToDoTable } from '@/utils/Constants';

import { knexConnection } from '@/services/database/DatabaseService';

import { ToDo } from '@/types/model/ToDo';

export async function deleteAllToDos(): Promise<ToDo|undefined> {
  return knexConnection()
    .delete<ToDo[]>()
    .from(ToDoTable);
}

export async function deleteToDoById(id: number): Promise<ToDo|undefined> {
  return knexConnection()
    .delete<ToDo>()
    .from(ToDoTable)
    .where('id', id);
}

export async function deleteToDoList(ids: number[]): Promise<ToDo|undefined> {
  return knexConnection()
    .delete<ToDo>()
    .from(ToDoTable)
    .whereIn('id', ids);
}
