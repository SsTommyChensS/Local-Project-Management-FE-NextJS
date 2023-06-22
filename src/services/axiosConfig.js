import axios from 'axios';
import { getCookie } from 'cookies-next';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true
});

//set Authorization when logged in
const accessToken = getCookie("token");
if(accessToken === undefined) {
    instance.defaults.headers.common['Authorization'] = '';
} else {
    instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}

export default instance;