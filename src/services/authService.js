import axios from "axios";

const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;

export function signup(data) {
    return axios.post(`${base_url}/auth/signup`, data);
}

export function login(data) {
    return axios.post(`${base_url}/auth/login`, data);
}