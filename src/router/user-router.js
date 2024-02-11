import info from "@/views/userView/user-Info.vue"
import update from "@/views/userView/user-update.vue"

const userRouter = [
    {path: "/user/info", component: info},
    {path: "/user/update", component: update},
]

export default userRouter