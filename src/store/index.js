// src/store/index.js
import { createStore } from "vuex";
import todoModule from "./modules/todo";
// import * as todoModule from "@/store/modules/todo.js";

const store = createStore({
  modules: {
    todo: todoModule,
  },
});

export default store;
