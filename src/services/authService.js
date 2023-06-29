import axiosConfig from "./axiosConfig";

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
//Have to use fetch for this api -> axios not support in nextjs middleware
export async function renewToken(refreshToken) {
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL;
    return await fetch(`${base_url}/auth/renew_token`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: refreshToken })
    });
}