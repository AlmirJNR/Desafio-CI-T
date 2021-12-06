/* eslint-disable import/prefer-default-export */
import knex, { Knex } from 'knex';

/** The singleton instance of Knex */
let knexInstance: Knex;

/** Returns the Knex singleton */
export const knexConnection = (): Knex => {
  // This ensures that the Knex instance will be created when first called
  // and will ever only be one instance
  if (!knexInstance) {
    knexInstance = knex({
      client: 'postgres',
      connection: process.env.DATABASE_CONNECTION_STRING,
      useNullAsDefault: true,
      searchPath: 'public',
    });
  }

  return knexInstance;
};
