import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.raw(
    `CREATE TABLE IF NOT EXISTS todos(
      id serial PRIMARY KEY,
      text text NOT NULL,
      finished boolean NOT NULL,
      date_created timestamp NOT NULL,
      date_finished timestamp
    )`,
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('todos');
}
