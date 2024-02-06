import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'; // 기본 스타일
import './assets/css/global-style.css'; // 전역 스타일
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


createApp(App).use(router).mount('#app')
