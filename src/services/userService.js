import  axiosConfig from "./axiosConfig"

//Get your profile's information
export function getYourProfile () {
    return axiosConfig.get("/user/your-profile/get");
}