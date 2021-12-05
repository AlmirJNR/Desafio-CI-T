<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js ToDo App"/>
    <Table :table-data="toDoList"/>
  </div>
</template>

<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import Table from '@/components/Table.vue';
import { ref } from 'vue';

const toDoList = ref([{
    text: 'Item 01',
    isDone: false
  },
  {
    text: 'Item 02',
    isDone: false
  },
  {
    text: 'Item 03',
    isDone: false
  }
]);
</script>

<style>
</style>
