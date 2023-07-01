import axiosConfig from "./axiosConfig"

//Get my projects
export function getMyProjects (currentPage) {
    return axiosConfig.get(`/project/my-projects/page/${currentPage}/get`);
}

//Get my projects by status
export function getMyProjectsByStatus (status, currentPage) {
    return axiosConfig.get(`/project/my-projects/status/${status}/page/${currentPage}/get`);
}

//Get my projects by title 
export function getMyProjectsByTitle (title, currentPage) {
    return axiosConfig.get(`/project/my-projects/title/${title}/page/${currentPage}/get`);
}

//Remove project
export function removeProject (project_id) {
    return axiosConfig.delete(`/project/${project_id}/remove`);
}