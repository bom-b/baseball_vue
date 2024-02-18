import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state: {
        headerType: "no",
    },
    mutations: {
        setHeaderType(state, headerType) {
            state.headerType = headerType;
        },
    }
})

export default store