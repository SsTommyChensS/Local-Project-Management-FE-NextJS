import  axiosConfig from "./axiosConfig"

//Register
export function signup(data) {
    return axiosConfig.post(`/auth/signup`, data);
}
//Login
export function login(data) {
    return axiosConfig.post(`/auth/login`, data);
}
//Logout
export function logout() {
    return axiosConfig.get(`/auth/logout`);
}
//Renew token using refreshToken (cookie)
export function renewToken() {
    return axiosConfig.get(`/auth/renew_token`);
}