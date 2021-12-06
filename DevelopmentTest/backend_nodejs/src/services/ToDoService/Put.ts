import { ToDoTable } from '@/utils/Constants';

import { knexConnection } from '@/services/database/DatabaseService';

import { ToDo } from '@/types/model/ToDo';

export async function updateToDoById(id: number, updatedText: string, updatedFinished: boolean, updatedDateCreated: Date, updatedDateFinished: Date): Promise<ToDo|undefined> {
  return knexConnection()
    .update<ToDo>({
      text: updatedText,
      finished: updatedFinished,
      date_created: updatedDateCreated,
      date_finished: updatedDateFinished,
    })
    .from(ToDoTable)
    .where('id', id);
}

export async function updateToDoTextById(id: number, updatedText: string): Promise<ToDo|undefined> {
  return knexConnection()
    .update<ToDo>({
      text: updatedText,
    })
    .from(ToDoTable)
    .where('id', id);
}

export async function updateToDoFinishedById(id: number, updatedFinished: boolean, updatedDateFinished: Date): Promise<ToDo|undefined> {
  return knexConnection()
    .update<ToDo>({
      finished: updatedFinished,
      date_finished: updatedDateFinished,
    })
    .from(ToDoTable)
    .where('id', id);
}

export async function updateToDoIsDateCreatedById(id: number, updatedDateCreated: Date): Promise<ToDo|undefined> {
  return knexConnection()
    .update<ToDo>({
      date_created: updatedDateCreated,
    })
    .from(ToDoTable)
    .where('id', id);
}

export async function updateToDoIsDateFinishedById(id: number, updatedDateFinished: Date): Promise<ToDo|undefined> {
  return knexConnection()
    .update<ToDo>({
      date_finished: updatedDateFinished,
    })
    .from(ToDoTable)
    .where('id', id);
}
