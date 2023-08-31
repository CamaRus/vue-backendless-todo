// src/store/modules/todo.js
// import { createStore } from "vuex";
import Backendless from "backendless";

const state = {
  tasks: [],
};

const mutations = {
  SET_TASKS(state, tasks) {
    state.tasks = tasks;
    // state.tasks = state.tasks.sort((task) => task.created === created);
  },
  ADD_TASK(state, task) {
    state.tasks.push(task);
  },
  DELETE_TASK(state, taskId) {
    state.tasks = state.tasks.filter((task) => task.objectId !== taskId);
  },
  SORT_TASKS(state) {
    state.tasks.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at); // Сортировка по убыванию даты
    });
  },
  UPDATE_TASK_TEXT(state, { taskId, newText }) {
    const task = state.tasks.find((task) => task.objectId === taskId);
    if (task) {
      task.text = newText;
    }
  },
};

const actions = {
  async fetchTasks({ commit }) {
    const queryBuilder = await Backendless.DataQueryBuilder.create().setSortBy([
      "created DESC",
    ]);
    const tasks = await Backendless.Data.of("Task").find(queryBuilder);
    commit("SET_TASKS", tasks);
  },
  async createTask({ commit }, taskText) {
    const newTask = {
      text: taskText,
      done: false,
      created_at: new Date().toISOString(),
    };
    const savedTask = await Backendless.Data.of("Task").save(newTask);
    commit("ADD_TASK", savedTask);
    commit("SORT_TASKS"); // Добавляем этот коммит для сортировки
  },
  async deleteTask({ commit }, taskId) {
    await Backendless.Data.of("Task").remove(taskId);
    commit("DELETE_TASK", taskId);
  },
  async updateTaskText({ commit }, { taskId, newText }) {
    await Backendless.Data.of("Task").save({ objectId: taskId, text: newText });
    commit("UPDATE_TASK_TEXT", { taskId, newText });
  },

  //   async deleteTask({ commit, state }, taskId) {
  //     await Backendless.Data.of("Task").remove(taskId);
  //     commit("DELETE_TASK", taskId);
  //     state.tasks = state.tasks.filter((task) => task.objectId !== taskId); // Удаляем задачу из состояния
  //   },
};

const todoModule = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default todoModule;
