<template>
  <div class="container">
    <h2 class="center-align">Task List</h2>
    <ul class="collection">
      <li
        class="collection-item center-align"
        v-for="task in tasks"
        :key="task.objectId"
      >
        <div v-if="task.editing">
          <input
            class="validate"
            type="text"
            v-model="task.newText"
            @keyup.enter="saveEditedTask(task)"
            @keyup.esc="cancelEditTask(task)"
          />
          <button class="btn-small" @click="saveEditedTask(task)">Save</button>
          <button class="btn-small red" @click="cancelEditTask(task)">
            Cancel
          </button>
        </div>
        <div style="display: flex; justify-content: space-between" v-else>
          <span>{{ task.text }} ({{ task.done ? "Done" : "Not Done" }})</span>
          <div style="text-align: end">
            <button class="btn-small" @click="removeTask(task.objectId)">
              Delete
            </button>
            <button class="btn-small" @click="editTask(task)">Edit</button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("todo", ["tasks"]),
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    ...mapActions("todo", ["fetchTasks", "deleteTask", "updateTaskText"]),
    async removeTask(taskId) {
      await this.deleteTask(taskId);
    },
    editTask(task) {
      task.editing = true;
      task.newText = task.text;
    },
    async saveEditedTask(task) {
      if (task.newText.trim() === "") return;
      await this.updateTaskText({
        taskId: task.objectId,
        newText: task.newText,
      });
      task.editing = false;
    },
    cancelEditTask(task) {
      task.editing = false;
    },
  },
};
</script>

<style>
.container {
  margin-top: 40px;
}
</style>
