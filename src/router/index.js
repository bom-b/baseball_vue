import {createRouter, createWebHistory, RouterView} from "vue-router";
import store from '@/store';

import Home from "@/views/Home.vue";

/*싱글플레이 라우터*/
import singlePlay from "@/router/single-play.js"

/*회원가입 라우터*/
import singUp from "@/router/sing_up.js";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {headerType: "home"}
    },

    // 싱글플레이
    {
        path: '/singlePlay',
        component: RouterView,
        children: singlePlay,
        meta: {headerType: "single"}
    },

    // 회원가입
    {
        path: '/singUp',
        component: RouterView,
        children: singUp,
        meta: {headerType: "single"}
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.headerType) {
        store.commit('setHeaderType', to.meta.headerType); // 'setHeaderType'은 headerType 값을 변경하는 뮤테이션입니다.
    }
    next();
});


export default router