import { createApp } from 'vue';
import App from './App.vue';
import { onMounted } from 'vue';
import VueDPlayer from 'vue-dplayer';
import 'vue-dplayer/dist/vue-dplayer.css';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Axios from "axios"
import router from './router'

Axios.defaults.baseURL = 'http://localhost:8088';

createApp(App)
.use(ElementPlus)
.use(VueDPlayer)
.use(router)
.mount('#app');