import  axiosConfig from "./axiosConfig"

//Get your profile's information
export function getYourProfile () {
    return axiosConfig.get("/user/your-profile/get");
}

export function updateProfile (user_id, data) {
    return axiosConfig.put(`/user/profile/${user_id}/update`, data);
}

export function uploadAvatar (data) {
    return axiosConfig.post('/user/upload-avatar', data, {
        headers: { "Content-Type": "multipart/form-data"}
    });
}