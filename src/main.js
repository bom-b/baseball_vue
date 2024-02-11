import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AOS from 'aos';
import VueSweetalert2 from 'vue-sweetalert2';
import sweetalertOptions from '@/assets/js/sweetalertOptions.js';
import axiosInstance from './utils/apiClient.js';
import axiosWithoutValidation from '@/utils/apiClientWithoutValidation.js';
import './assets/css/main.css'; // 기본 스타일
import './assets/css/global-style.css'; // 전역 스타일
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import 'aos/dist/aos.css';

const app = createApp(App);
app.use(router)
app.use(store)
app.use(VueSweetalert2, sweetalertOptions);

// AOS 초기화
app.config.globalProperties.$AOS = AOS;
AOS.init();

// 웹사이트 베이스 주소
app.config.globalProperties.$vueBaseURL = import.meta.env.VITE_VUE_BASE_URL;

// s3 베이스 주소
app.config.globalProperties.$s3BaseURL = "https://online-baseball.s3.ap-northeast-2.amazonaws.com"

// axios 전역변수 등록. 헤더에 토큰값을 적재하기 위해서 해당 $axios를 사용해야함.
// axios 요청이 일어날때 토큰의 유효성 검사도 함께 진행.
app.config.globalProperties.$axios = axiosInstance;

// 여전히 헤더에 토큰값은 적재하지만 토큰의 유효성 검사는 하지 않음.
app.config.globalProperties.$axiosWithoutValidation = axiosWithoutValidation;

app.mount('#app')
