import singUpWithOauth from "@/views/singup/singup_with_oauth.vue"
import kakaoJoin from "@/views/singup/kakao-join.vue"

const singUp = [
    {path: "/singUp/singup_with_oauth", component: singUpWithOauth},
    {path: "/singUp/kakaoJoin", component: kakaoJoin}
]

export default singUp