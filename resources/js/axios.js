import axios from 'axios';
import store from './stores';

const axiosClient = axios.create({
    baseURL: `/api`
})

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
    
    return config;
})


export default axiosClient;