import { createApp } from 'vue'
import { createPinia } from 'pinia'
// element plus
import ElementPlus from "element-plus";
// element icons
import * as Icons from "@element-plus/icons-vue";
import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import router from './router'

import './assets/css-vars.css'

import "element-plus/es/components/message/style/css";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
