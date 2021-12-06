import dotenv from 'dotenv';

// eslint-disable-next-line import/no-extraneous-dependencies
require('tsconfig-paths/register');

dotenv.config({
  path: '../.env',
});

const config = {
  main: {
    client: 'postgresql',
    connection: process.env.DATABASE_CONNECTION_STRING,
    migrations: {
      extensions: 'ts',
    },
  },
};

export default config;
