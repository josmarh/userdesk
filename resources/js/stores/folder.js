import { createStore } from "vuex";
import axiosClient from "../axios";

const folderStore = createStore({
    state: {
        folders: {
            data: [],
            meta: {},
            links: {}
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
    },
    mutations: {
        setFolders: (state, data) => {
            state.folders = data
        }
    },
    modules: {}
})

export default folderStore;