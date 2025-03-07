import { createStore } from "vuex";
import axiosClient from "../axios";

const folderStore = createStore({
    state: {
        folders: {
            data: [],
            meta: {},
            links: {}
        },
        folder: {
            data: {}
        }
    },
    getters: {},
    actions: {
        getFolders({ commit }){
            return axiosClient.get('/folders')
                .then(({data}) => {
                    commit('setFolders',data)
                    return data;
                })
        },
        storeFolder({ }, payload){
            return axiosClient.post('/folder/store', payload)
                .then(({data}) => {
                    return data;
                })
        },
        showFolder({ commit }, id){
            return axiosClient.get(`/folder/show/${id}`)
                .then(({data}) => {
                    commit('setFolder', data)
                    return data;
                })
        },
        updateFolder({ }, payload){
            return axiosClient.put(`/folder/update/${payload.id}`, payload)
                .then(({data}) => {
                    return data;
                })
        },
        deleteFolder({ }, id){
            return axiosClient.delete(`/folder/delete/${id}`)
                .then(({data}) => {
                    return data;
                })
        },
        removeFolderInfo({ commit }) {
            commit('setFolderEmpty')
        }
    },
    mutations: {
        setFolders: (state, data) => {
            state.folders = data
        },
        setFolder: (state, data) => {
            state.folder = data
        },
        setFolderEmpty: state => {
            state.folder.data = {}
        }
    },
    modules: {}
})

export default folderStore;