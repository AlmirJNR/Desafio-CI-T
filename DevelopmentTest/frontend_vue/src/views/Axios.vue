<template>
  <div class="container-global">
    <h1>My TODO List</h1>
    <div>
      <div class="container-header">
        <p>Description:</p>
        <input class="input" v-model="message" />
        <button @click="callService(createNewToDo(message)); clearNewToDoInput()">Create</button>
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
                  <button id="show-modal" @click="showEditModal(item.id)">
                  <Icon class="Icon edit" icon="jam:write-f" />Edit
                  </button>
                <button @click="deleteToDoById(item.id)">
                  <Icon class="Icon delete" icon="bx:bxs-trash-alt" />Delete
                </button>
                <button
                  v-if="!item.finished" @click="callService(updateToDoFinishedById(item.id, !item.finished, new Date()))">
                  <Icon class="Icon finished" icon="ic:round-download-done" />Finish
                </button>
              </div>
            </td>
            <td>{{ moment(item.dateCreated).format("DD-MM-YYYY") }}</td>
            <td>{{ item.finished ? moment(item.dateFinished).format("DD-MM-YYYY") : '' }}</td>
          </tr>

          <!-- use the modal component, pass in the prop -->
          <transition name="modal">
            <EditModal v-if="showModal">
              <!-- you can use custom content here to overwrite default content -->
              <template v-slot:header>
                <h2 class="modalText">Edit your ToDo</h2>
              </template>
              <template v-slot:body>
                <input class="input" v-model="editModalmessage"/>
              </template>
              <template v-slot:footer>
                <div class="container-buttons-modal">
                  <button @click="showModal = false; callService(updateToDoTextById(editToDo!, editModalmessage)); clearModalInput()">
                    Ok
                  </button>
                  <button @click="showModal = false; clearModalInput();">
                    Cancel
                  </button>
                </div>
              </template>
            </EditModal>
          </transition>
        </table>

        <div class="container-footer">
          <button v-if="toDos.length > 0" class="footerButton1" @click="selectAllToDos">
            <Icon class="Icon footerButton1Icon" icon="fa-solid:border-all" />{{selectedToDos.length > 0 ? 'Deselect All' : 'Select All'}}
          </button>
          <button v-if="selectedToDos.length > 0" class="footerButton2" @click="callService(deleteToDoList(selectedToDos)); selectedToDos = []">
            <Icon class="Icon footerButton2Icon" icon="bx:bxs-trash-alt" />Delete selected
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
import EditModal from '@/components/EditModal.vue'

import {
  createNewToDo,
  getAllToDos,
  updateToDoById,
  updateToDoDateCreatedById,
  updateToDoDateFinishedById,
  updateToDoFinishedById,
  updateToDoTextById,
  deleteAllToDos,
  deleteToDoById,
  deleteToDoList
} from '@/services/ToDoService';

const message = ref<string>('');
const editModalmessage = ref<string>('');

const toDos = ref<ToDo[]>([]);

const toDoFinishedClass = 'toDo';
const toDoUnfinishedClass = 'toDoUnfinished';


function callService(callback: any) {
  callback.then(() => {
    getToDos();
  });
}

function getToDos() {
  getAllToDos().then((response) => {
    toDos.value = response.data;
  });
}

getToDos();

const editToDo = ref<number>();

function showEditModal(itemId: number) {
  editToDo.value = itemId;
  showModal.value = true;
}

const selectedToDos = ref<number[]>([]);

const showModal = ref<boolean>(false);

function clearModalInput() {
  editModalmessage.value = '';
}
function clearNewToDoInput() {
  message.value = '';
}

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
</script>

<style scoped>
.container-global {
  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
}

.container-global > h1 {
  color: #41B883;
}

.container-header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}
.input {
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

.container-buttons-modal {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}

.modalText {
  color: #41B883;
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

button:hover .footerButton1Icon {
  color: orange;
}
button:active .footerButton1Icon {
  color: white;
}
button:hover .footerButton2Icon {
  color: red;
}
button:active .footerButton2Icon {
  color: white;
}
</style>
