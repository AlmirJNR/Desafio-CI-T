<template>
  <div class="container-global">
    <h1>Welcome to Axios page</h1>
    <div>
      <div class="container-header">
        <p>Description:</p>
        <input v-model="message" />
        <button @click="createNewToDo">Create new ToDo</button>
      </div>

      <div class="container-table">
        <table v-if="toDos.length > 0">
          <tr>
            <th colspan="2">Items</th>
            <th>Actions</th>
            <th>Created at</th>
            <th>Finished at</th>
          </tr>

          <tr v-for="item in toDos">
            <td>
              <input type="checkbox" :value="item.id" v-model="selectedToDos" />
            </td>
            <td :class="[item.finished ? toDoFinishedClass : toDoUnfinishedClass]">{{ item.text }}</td>
            <td>
              <div class="container-actions">
                <button @click="updateToDoTextById(item.id, message)">
                  <Icon class="Icon edit" icon="jam:write-f" />Edit
                </button>
                <button @click="deleteToDoById(item.id)">
                  <Icon class="Icon delete" icon="bx:bxs-trash-alt" />Delete
                </button>
                <button
                  v-if="!item.finished"
                  @click="updateToDoFinishedById(item.id, !item.finished, new Date())"
                >
                  <Icon class="Icon finished" icon="ic:round-download-done" />Finish
                </button>
              </div>
            </td>
            <td>{{ moment(item.dateCreated).format("DD-MM-YYYY") }}</td>
            <td>{{ item.finished ? moment(item.dateFinished).format("DD-MM-YYYY") : '' }}</td>
          </tr>
        </table>

        <div class="container-footer">
          <button v-if="toDos.length > 0" class="footerButton1" @click="selectAllToDos">
            <Icon class="Icon" icon="fa-solid:border-all" />Select All
          </button>
          <button v-if="selectedToDos.length > 0" class="footerButton2" @click="deleteSelectedToDos">
            <Icon class="Icon" icon="bx:bxs-trash-alt" />Delete selected
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ToDo } from '@/types/ToDo';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import moment from 'moment';

const message = ref<string>('');

const toDos = ref<ToDo[]>([]);

const toDoFinishedClass = 'toDo';
const toDoUnfinishedClass = 'toDoUnfinished';

function getAllToDos() {
  axios.get('http://localhost:5000/api/v1/todo/').then((response) => {
    toDos.value = response.data;
  });
}

getAllToDos();

const selectedToDos = ref<number[]>([]);

function selectAllToDos() {
  if (selectedToDos.value.length > 0) {
    selectedToDos.value = [];
  }
  else {
    for (const item of toDos.value) {
      selectedToDos.value.push(item.id);
    }
  }
}

function deleteSelectedToDos() {
  for (const item of selectedToDos.value) {
    deleteToDoById(item);
  };

  selectedToDos.value = [];
};

async function createNewToDo() {
  await axios({
    method: 'post',
    url: 'http://localhost:5000/api/v1/todo/create',
    data: {
      text: message.value,
      finished: false,
      dateCreated: new Date(),
    }
  });

  getAllToDos();
}
async function updateToDoById(id: number) {
  await axios({
    method: 'put',
    url: `http://localhost:5000/api/v1/todo/update/${id}`,
    data: {
      text: 'Updated Axios todo',
      finished: true,
      dateCreated: new Date(),
      dateFinished: new Date(),
    }
  });

  getAllToDos();
}
async function updateToDoTextById(id: number, updatedText: string) {
  await axios({
    method: 'put',
    url: `http://localhost:5000/api/v1/todo/update/text/${id}`,
    data: {
      text: `${updatedText}`,
    }
  });

  getAllToDos();
}
async function updateToDoFinishedById(id: number, updatedFinished: boolean, updatedDateFinished: Date) {
  await axios({
    method: 'put',
    url: `http://localhost:5000/api/v1/todo/update/finished/${id}`,
    data: {
      finished: updatedFinished,
      dateFinished: updatedDateFinished,
    }
  });

  getAllToDos();
}
async function updateToDoDateCreatedById(id: number, updatedDateCreated: Date) {
  await axios({
    method: 'put',
    url: `http://localhost:5000/api/v1/todo/update/datecreated/${id}`,
    data: {
      dateCreated: updatedDateCreated,
    }
  });

  getAllToDos();
}
async function updateToDoDateFinishedById(id: number, updatedDateFinished: Date) {
  await axios({
    method: 'put',
    url: `http://localhost:5000/api/v1/todo/update/datefinished/${id}`,
    data: {
      dateFinished: updatedDateFinished,
    }
  });

  getAllToDos();
}
async function deleteAllToDos() {
  await axios({
    method: 'delete',
    url: 'http://localhost:5000/api/v1/todo/delete/all/',
  });

  getAllToDos();
}
async function deleteToDoById(id: number) {
  await axios({
    method: 'delete',
    url: `http://localhost:5000/api/v1/todo/delete/${id}`,
  });

  getAllToDos();
}
</script>

<style scoped>
.container-global {
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
}

.container-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.container-header > input {
  height: 1.5rem;
  font-size: 1em;
  padding: 0rem 0.5rem 0rem 0.5rem;
  margin: 0rem 1.5rem 0rem 0.5rem;
  border-radius: 0.25rem;
  border-width: 3px;
  border-style: solid;
  border-color: #cbd3da;
}

.container-table {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.container-table > table,
.container-table > table > tr {
  /* border: 1px solid red; */
  border-collapse: collapse;
  padding: 0;
  margin: 0;
}

.container-table > table > tr > th {
  border: 2px solid #9eadba;
  padding: 0.75rem;
  margin: 0;
  font-weight: 600;
}

.container-table > table > tr > td {
  border: 2px solid #9eadba;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin: 0;
}

.container-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.container-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  width: 100%;

  margin: 1rem 0rem 0rem 0rem;
}

.toDo {
  font-weight: 600;
  font-family: "Roboto", sans-serif;

  min-width: 15rem;
  text-align: start;

  background-color: #f3c19d;
}
.toDoUnfinished {
  font-weight: 600;
  font-family: "Roboto", sans-serif;

  min-width: 15rem;
  text-align: start;
}

button {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-width: 5rem;
  min-height: 2rem;
  padding: 0.5rem;
  margin: 0 0.25rem 0 0.25rem;
  background-color: #c3cfd9;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
}
.footerButton1 {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-width: 7rem;
  min-height: 2rem;
  padding: 0;
  margin: 0;
  background-color: #c3cfd9;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
  margin-right: 1rem;
}
.footerButton2 {
    display: flex;
  align-items: center;
  justify-content: space-evenly;
  min-width: 10rem;
  min-height: 2rem;
  padding: 0;
  margin: 0;
  background-color: #c3cfd9;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
}
.Icon {
  font-size: 1.25em;
  color: white;
}

button:hover .edit {
  font-size: 1.25em;
  color: orange;
}
button:hover .delete {
  font-size: 1.25em;
  color: red;
}
button:hover .finished {
  font-size: 1.25em;
  color: green;
}
</style>
