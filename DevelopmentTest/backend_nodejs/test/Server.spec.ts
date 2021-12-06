import { describe, it } from 'mocha';
import request from 'supertest';

import Server from '@/Server';

describe('Testing if api is running', () => {
  it('should respond with a default message', (done) => {
    request(Server)
      .get('/')
      .expect(200, {
        message: 'Almir Junior ToDo List Default Api Response',
      }, done);
  });
  it('should respond with a not found message', (done) => {
    request(Server)
      .get('/inexistent')
      .expect(404, done);
  });
});
