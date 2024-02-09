import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state: {
        headerType: "home",
    },
    mutations: {
        setHeaderType(state, headerType) {
            state.headerType = headerType;
        },
    }
})

export default store