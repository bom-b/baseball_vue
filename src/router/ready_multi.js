import waitingRoom from "@/views/multi-play/waiting-room.vue"
import makeRoom from "@/views/multi-play/make-room.vue"

const readyMulti = [
    {path: "/ready/waitingRoom", component: waitingRoom},
    {path: "/ready/makeRoom", component: makeRoom},
]

export default readyMulti