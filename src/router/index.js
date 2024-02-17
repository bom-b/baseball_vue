import {createRouter, createWebHistory, RouterView} from "vue-router";
import store from '@/store';

import Home from "@/views/Home.vue";

/*테스트*/
import testRouter from "@/router/test-router.js"

/*싱글플레이 라우터*/
import singlePlay from "@/router/single-play.js"

/*멀티플레이 준비*/
import readyMulti from "@/router/ready_multi.js";

/*회원가입 라우터*/
import singUp from "@/router/sing_up.js";

/*유저관련 라우터*/
import userRouter from "@/router/user-router.js";



const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {headerType: "home"}
    },

    // 테스트
    {
        path: '/test',
        component: RouterView,
        children: testRouter,
        meta: {headerType: "ready"}
    },

    // 싱글플레이
    {
        path: '/singlePlay',
        component: RouterView,
        children: singlePlay,
        meta: {headerType: "single"}
    },

    // 멀티플레이 준비
    {
        path: '/ready',
        component: RouterView,
        children: readyMulti,
        meta: {headerType: "ready"}
    },

    // 회원가입
    {
        path: '/singUp',
        component: RouterView,
        children: singUp,
        meta: {headerType: "single"}
    },

    // 유저 서비스 관련
    {
        path: '/user',
        component: RouterView,
        children: userRouter,
        meta: {headerType: "single"}
    }
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