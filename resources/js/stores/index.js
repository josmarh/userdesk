import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        user: {
            data: JSON.parse(localStorage.getItem('userInfo')),
            token: localStorage.getItem('TOKEN'),
            permissions: localStorage.getItem('can'),
        },
    },
    getters: {},
    actions: {

    },
    mutations: {
        setUser: (state, userData) => {
            state.user.data = userData.user
            state.user.token = userData.token
            state.user.permissions = userData.permissions
            localStorage.setItem('userInfo', JSON.stringify(userData.user));
            localStorage.setItem('TOKEN', userData.token);
            localStorage.setItem('can', userData.permissions);
        },
    },
    modules: {}
})

export default store;