/* eslint-disable no-plusplus */
import { describe, it, before } from 'mocha';
import request from 'supertest';

import Server from '@/Server';
import { restartIdSequence, updateIdValues } from '@/services/ToDoService/RestartSequence';
import { deleteAllToDos } from '@/services/ToDoService/Delete';

describe('Testing ToDo Controllers', () => {
  before(async () => {
    await deleteAllToDos();
    await restartIdSequence();
    await updateIdValues();
  });

  describe('Testing ToDo POST and GET', () => {
    describe('POST five times', () => {
      for (let index = 0; index < 5; index++) {
        it('should return 201 when successfully creating an new toDo', async () => {
          await request(Server)
            .post('/api/v1/todo/create')
            .send({
              text: 'Mocha auto generated Test toDo',
              finished: false,
              dateCreated: '2021-12-31T10:00:00.000Z',
            })
            .expect(201);
        });
      }
    });

    describe('GET all', () => {
      it('should return 200 when successfully getting all toDos', async () => {
        await request(Server)
          .get('/api/v1/todo')
          .expect(200, [
            {
              id: 1,
              text: 'Mocha auto generated Test toDo',
              finished: false,
              date_created: '2021-12-31T10:00:00.000Z',
              date_finished: null,
            },
            {
              id: 2,
              text: 'Mocha auto generated Test toDo',
              finished: false,
              date_created: '2021-12-31T10:00:00.000Z',
              date_finished: null,
            },
            {
              id: 3,
              text: 'Mocha auto generated Test toDo',
              finished: false,
              date_created: '2021-12-31T10:00:00.000Z',
              date_finished: null,
            },
            {
              id: 4,
              text: 'Mocha auto generated Test toDo',
              finished: false,
              date_created: '2021-12-31T10:00:00.000Z',
              date_finished: null,
            },
            {
              id: 5,
              text: 'Mocha auto generated Test toDo',
              finished: false,
              date_created: '2021-12-31T10:00:00.000Z',
              date_finished: null,
            },
          ]);
      });
    });
  });

  describe('Testing ToDo PUT', () => {
    describe('PUT all infos', () => {
      it('should return 201 when successfully updating an toDo', async () => {
        await request(Server)
          .put('/api/v1/todo/update/1')
          .send({
            text: 'UPDATED Mocha auto generated Test toDo',
            finished: true,
            dateCreated: '2021-12-31T10:00:00.000Z',
            dateFinished: '2021-12-31T11:00:00.000Z',
          })
          .expect(201);
      });
    });

    describe('PUT text only', () => {
      it('should return 201 when successfully updating an toDo', async () => {
        await request(Server)
          .put('/api/v1/todo/update/text/2')
          .send({
            text: 'UPDATED Mocha auto generated Test toDo',
          })
          .expect(201);
      });
    });

    describe('PUT finished situation', () => {
      it('should return 201 when successfully updating an toDo', async () => {
        await request(Server)
          .put('/api/v1/todo/update/finished/3')
          .send({
            finished: true,
            dateFinished: '2021-12-31T15:00:00.000Z',
          })
          .expect(201);
      });
    });

    describe('PUT date created only', () => {
      it('should return 201 when successfully updating an toDo', async () => {
        await request(Server)
          .put('/api/v1/todo/update/datecreated/4')
          .send({
            dateCreated: '2021-12-31T11:00:00.000Z',
          })
          .expect(201);
      });
    });

    describe('PUT date finished only', () => {
      it('should return 201 when successfully updating an toDo', async () => {
        await request(Server)
          .put('/api/v1/todo/update/datefinished/5')
          .send({
            dateFinished: '2021-12-31T15:00:00.000Z',
          })
          .expect(201);
      });
    });

    describe('GET all updated', () => {
      it('should return 200 when successfully getting all updated toDos', async () => {
        await request(Server)
          .get('/api/v1/todo')
          .expect(200, [
            {
              id: 1,
              text: 'UPDATED Mocha auto generated Test toDo',
              finished: true,
              date_created: '2021-12-31T10:00:00.000Z',
              date_finished: '2021-12-31T11:00:00.000Z',
            },
            {
              id: 2,
              text: 'UPDATED Mocha auto generated Test toDo',
              finished: false,
              date_created: '2021-12-31T10:00:00.000Z',
              date_finished: null,
            },
            {
              id: 3,
              text: 'Mocha auto generated Test toDo',
              finished: true,
              date_created: '2021-12-31T10:00:00.000Z',
              date_finished: '2021-12-31T15:00:00.000Z',
            },
            {
              id: 4,
              text: 'Mocha auto generated Test toDo',
              finished: false,
              date_created: '2021-12-31T11:00:00.000Z',
              date_finished: null,
            },
            {
              id: 5,
              text: 'Mocha auto generated Test toDo',
              finished: false,
              date_created: '2021-12-31T10:00:00.000Z',
              date_finished: '2021-12-31T15:00:00.000Z',
            },
          ]);
      });
    });
  });

  describe('Testing ToDo DELETE', () => {
    describe('DELETE by id', () => {
      it('should return 200 when deleted operation was executed with success', async () => {
        await request(Server)
          .del('/api/v1/todo/delete/1')
          .expect(200);
      });
    });

    describe('GET all after DELETE by id', () => {
      it('should return 200 and all todos minus one', async () => {
        await request(Server)
          .get('/api/v1/todo/')
          .expect(200, [
            {
              id: 1,
              text: 'UPDATED Mocha auto generated Test toDo',
              finished: false,
              date_created: '2021-12-31T10:00:00.000Z',
              date_finished: null,
            },
            {
              id: 2,
              text: 'Mocha auto generated Test toDo',
              finished: true,
              date_created: '2021-12-31T10:00:00.000Z',
              date_finished: '2021-12-31T15:00:00.000Z',
            },
            {
              id: 3,
              text: 'Mocha auto generated Test toDo',
              finished: false,
              date_created: '2021-12-31T11:00:00.000Z',
              date_finished: null,
            },
            {
              id: 4,
              text: 'Mocha auto generated Test toDo',
              finished: false,
              date_created: '2021-12-31T10:00:00.000Z',
              date_finished: '2021-12-31T15:00:00.000Z',
            },
          ]);
      });
    });

    describe('DELETE all', () => {
      it('should return 200 when deleted operation was executed with success', async () => {
        await request(Server)
          .del('/api/v1/todo/delete/all')
          .expect(200);
      });
    });

    describe('GET all after DELETE all', () => {
      it('should return 404 that represents an empty table', async () => {
        await request(Server)
          .get('/api/v1/todo/')
          .expect(404);
      });
    });
  });
});
