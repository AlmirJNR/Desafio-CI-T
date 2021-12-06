import { ToDoTable } from '@/utils/Constants';

import { knexConnection } from '@/services/database/DatabaseService';

export async function restartIdSequence(): Promise<void> {
  return knexConnection().schema.raw(
    `ALTER SEQUENCE ${ToDoTable}_id_seq RESTART WITH 1`,
  );
}

export async function updateIdValues(): Promise<void> {
  return knexConnection().schema.raw(
    `UPDATE ${ToDoTable} SET id = DEFAULT`,
  );
}
