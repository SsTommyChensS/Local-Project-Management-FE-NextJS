import axios from 'axios';
import { getCookie } from 'cookies-next';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
});

//set Authorization when logged in
instance.interceptors.request.use(function(config) {
    const token = getCookie("token");
    if(token === undefined) {
        config.headers.Authorization = '';
    } else {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default instance;