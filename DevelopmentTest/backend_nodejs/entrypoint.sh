#!/bin/sh

npm run knex migrate:latest
npm test
npm run build && npm start
