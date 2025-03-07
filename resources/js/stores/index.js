import { createStore } from "vuex";
import axiosClient from "../axios";

const store = createStore({
    state: {
        notifications: {
            type: '',
            message: ''
        },
        user: {
            data: JSON.parse(localStorage.getItem('userInfo')),
            token: localStorage.getItem('TOKEN'),
            permissions: localStorage.getItem('can'),
        },
    },
    getters: {},
    actions: {
        setNotification({ commit }, payload){
            commit('setNotification', payload)
        },
        login({ commit }, user){
            return axiosClient.post('/login', user)
                .then(({data}) => {
                    commit('setUser', data)
                    return data;
                })
        },
        logout({ commit }){
            return axiosClient.post('/logout')
                .then(response => {
                    commit('logout')
                    localStorage.clear();
                    return response;
                })
        },
        forgotPassword({ }, user){
            return axiosClient.post('/forgot-password', user)
                .then(({data}) => {
                    return data;
                })
        },
        resetPassword({ }, user){
            return axiosClient.post('/reset-password', user)
                .then(({data}) => {
                    return data;
                })
        },
        updatePersonalInfo({ commit }, user){
            return axiosClient.put(`/profile/update`, user)
            .then(({data}) => {
                commit('updatePersonalInfo', data)
                return data;
            })
        },
        updatePassword({ commit }, userPass){
            return axiosClient.put(`/password/update`, userPass)
                .then(({data}) => {
                    commit('updatePassword')
                    return data;
                })
        },
        
    },
    mutations: {
        setNotification: (state, payload) => {
            state.notifications.type = payload.type
            state.notifications.message = payload.message
            setTimeout(() => {
                state.notifications.type = ''
                state.notifications.message = ''
            },5000)
        },
        setUser: (state, userData) => {
            state.user.data = userData.user
            state.user.token = userData.token
            state.user.permissions = userData.permissions
            localStorage.setItem('userInfo', JSON.stringify(userData.user));
            localStorage.setItem('TOKEN', userData.token);
            localStorage.setItem('can', userData.permissions);
        },
        updatePersonalInfo: (state, userInfo) => {
            state.user.data = userInfo.user
            localStorage.setItem('userInfo', JSON.stringify(userInfo.user));
        },
        logout: state => {
            state.user.data = {};
            state.user.token = null;
        },
    },
    modules: {}
})

export default store;