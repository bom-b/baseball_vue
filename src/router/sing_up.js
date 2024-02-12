import singUpWithOauth from "@/views/singup/singup_with_oauth.vue"
import kakaoJoin from "@/views/singup/kakao-join.vue"
import success from "@/views/singup/success.vue"

const singUp = [
    {path: "/singUp/singup_with_oauth", component: singUpWithOauth},
    {path: "/singUp/kakaoJoin", component: kakaoJoin},
    {path: "/singUp/success", component: success}
]

export default singUp