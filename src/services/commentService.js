import axiosConfig from "./axiosConfig";

//Get comments by project 
export function getComments (project_id, currentPage) {
    return axiosConfig.get(`comments/project/${project_id}/page/${currentPage}/get`);
}

//Post comment
export function postComment (project_id, data) {
    return axiosConfig.post(`comment/project/${project_id}/post`, data);
}

//Update comment
export function updateComment (comment_id) {
    return axiosConfig.put(`comment/${comment_id}/update`);
}

//Remove comment
export function removeComment (comment_id) {
    return axiosConfig.delete(`comment/${comment_id}/remove`);
}