<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  msg: string,
}>();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello > h1 {
  font-weight: 600;
}
</style>
