import { ToDoTable } from '@/utils/Constants';

import { knexConnection } from '@/services/database/DatabaseService';

import { ToDo } from '@/types/model/ToDo';

export async function createNewToDo(text: string, finished: boolean, dateCreated: Date): Promise<any|undefined> {
  return knexConnection()
    .insert<ToDo>({
      text,
      finished,
      date_created: dateCreated,
    })
    .into(ToDoTable);
}
