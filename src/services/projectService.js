import axiosConfig from "./axiosConfig"

//Get my projects
export function getMyProjects (currentPage) {
    return axiosConfig.get(`/project/my-projects/page/${currentPage}/get`);
}