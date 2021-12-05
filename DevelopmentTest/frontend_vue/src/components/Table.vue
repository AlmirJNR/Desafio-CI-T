<template>
<div class="container-table">
  <table>
    <tr>
      <th>
      </th>
      <th>
        Items
      </th>
      <th>
        Actions
      </th>
    </tr>
    <tr v-for="(item, index) in tableData">
      <td>
        <input type="checkbox" :value="index" v-model="selectedToDos" @change="selectToDo">
      </td>
      <td class="toDo">
        {{item.text}}
      </td>
      <td>
        <div class="container-actions">
          <button>
            <Icon class="Icon edit" icon="jam:write-f"/>Edit
          </button>
          <button @click="deleteToDo(index)">
            <Icon class="Icon delete" icon="bx:bxs-trash-alt"/>Delete
          </button>
          <button v-if="!item.isDone" @click="toggleDoneStatus(item)">
            <Icon class="Icon isDone" icon="ic:round-download-done"/>{{item.isDone}}
          </button>
        </div>
      </td>
    </tr>
  </table>

  <button v-if="selectedToDos.length > 0" @click="deleteSelectedToDos">
    Delete selected
  </button>
</div>
</template>

<script setup lang="ts">
import ToDo from '@/types/ToDo';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps<{
  tableData: ToDo[]
}>();

const selectedToDos = ref<number[]>([]);
function selectToDo() {
  console.log(selectedToDos.value);
};
function deleteSelectedToDos() {
  for (const index in selectedToDos.value) {
    props.tableData.splice(Number(index), 1);
  };

  selectedToDos.value = [];
};

function toggleDoneStatus(toDo: ToDo) {
  toDo.isDone = !toDo.isDone;
};
function deleteToDo(index: number) {
  props.tableData.splice(index, 1);
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  border: 2px solid #9EADBA;
  padding: 0.75rem;
  margin: 0;
  font-weight: 600;
}

.container-table > table > tr > td {
  border: 2px solid #9EADBA;
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin: 0;
}

.container-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.toDo {
  font-weight: 600;
  font-family: 'Roboto', sans-serif;

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
  background-color: #C3CFD9;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
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
button:hover .isDone {
  font-size: 1.25em;
  color: green;
}
</style>
