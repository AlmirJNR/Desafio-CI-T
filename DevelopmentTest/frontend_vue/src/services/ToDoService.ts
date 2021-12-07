import axios from 'axios';

export async function getAllToDos() {
  return axios.get('http://localhost:5000/api/v1/todo/');
}

export async function createNewToDo(message: string) {
  return axios({
    method: 'post',
    url: 'http://localhost:5000/api/v1/todo/create',
    data: {
      text: message,
      finished: false,
      dateCreated: new Date(),
    }
  });
}

export async function updateToDoById(id: number, text: string, finished?: boolean, dateCreated?: Date, dateFinished?: Date) {
  return axios({
    method: 'put',
    url: `http://localhost:5000/api/v1/todo/update/${id}`,
    data: {
      text: `${text}`,
      finished: finished || false,
      dateCreated: dateCreated || new Date(),
      dateFinished: dateFinished || new Date(),
    }
  });
}

export async function updateToDoTextById(id: number, updatedText: string) {
  return axios({
    method: 'put',
    url: `http://localhost:5000/api/v1/todo/update/text/${id}`,
    data: {
      text: `${updatedText}`,
    }
  });
}

export async function updateToDoFinishedById(id: number, updatedFinished: boolean, updatedDateFinished: Date) {
  return axios({
    method: 'put',
    url: `http://localhost:5000/api/v1/todo/update/finished/${id}`,
    data: {
      finished: updatedFinished,
      dateFinished: updatedDateFinished,
    }
  });
}

export async function updateToDoDateCreatedById(id: number, updatedDateCreated: Date) {
  return axios({
    method: 'put',
    url: `http://localhost:5000/api/v1/todo/update/datecreated/${id}`,
    data: {
      dateCreated: updatedDateCreated,
    }
  });
}

export async function updateToDoDateFinishedById(id: number, updatedDateFinished: Date) {
  return axios({
    method: 'put',
    url: `http://localhost:5000/api/v1/todo/update/datefinished/${id}`,
    data: {
      dateFinished: updatedDateFinished,
    }
  });
}

export async function deleteAllToDos() {
  return axios({
    method: 'delete',
    url: 'http://localhost:5000/api/v1/todo/delete/all/',
  });
}

export async function deleteToDoById(id: number) {
  return axios({
    method: 'delete',
    url: `http://localhost:5000/api/v1/todo/delete/${id}`,
  });
}

export async function deleteToDoList(ids: number[]) {
  return axios({
    method: 'post',
    url: 'http://localhost:5000/api/v1/todo/delete/list',
    data: {
      ids,
    }
  });
}
