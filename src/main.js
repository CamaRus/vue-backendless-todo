// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')

// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";

import Backendless from "backendless";

const APP_ID = "6A3982D3-ACB3-D227-FFE4-9839C74BD300";
const API_KEY = "611C81A9-F39C-4A4A-9CF1-D5DE0B346199";

Backendless.initApp(APP_ID, API_KEY);

const app = createApp(App);
app.use(store);
app.mount("#app");
