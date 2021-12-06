import { ToDoTable } from '@/utils/Constants';

import { knexConnection } from '@/services/database/DatabaseService';

export async function restartIdSequence(): Promise<void> {
  return knexConnection().schema.raw(
    `ALTER SEQUENCE ${ToDoTable}_id_seq RESTART WITH 1`,
  );
}
