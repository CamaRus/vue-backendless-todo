<!-- src/components/TaskForm.vue -->
<template>
  <div class="center-align">
    <h2>Add Task</h2>
    <div>
      <input style="width: 50%" v-model="taskText" />
      <button class="btn-small waves-effect waves-light" @click="addTask">
        Add Task<i class="material-icons right">send</i>
      </button>
    </div>
  </div>
</template>

<script>
// import { ref, mapActions } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      taskText: "",
    };
  },
  methods: {
    ...mapActions("todo", ["createTask"]),
    addTask() {
      if (this.taskText.trim() !== "") {
        this.createTask(this.taskText);
        this.taskText = "";
      }
    },
  },
};
</script>
