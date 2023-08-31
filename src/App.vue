<!-- src/App.vue -->
<template>
  <div id="app">
    <h1 class="center-align">Vue Backendless To-Do App</h1>
    <TaskForm />
    <TaskList />
  </div>
</template>

<script>
import TaskForm from "./components/TaskForm.vue";
import TaskList from "./components/TaskList.vue";

export default {
  components: {
    TaskForm,
    TaskList,
  },
};
</script>
