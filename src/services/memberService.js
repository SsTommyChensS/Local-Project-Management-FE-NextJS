import axiosConfig from "./axiosConfig";

//Get members of a project
export function getMembers (project_id, currentPage) {
    return axiosConfig.get(`project/${project_id}/members/page/${currentPage}/get`);
}

//Change member's permission
export function changeMemberPermission (project_id, data) {
    return axiosConfig.put(`project/${project_id}/change-permission`, data);
}

//Remove a member
export function removeMember (project_id, member_id) {
    return axiosConfig.delete(`project/${project_id}/member/${member_id}/remove`);
}

//Invite user to a project
export function inviteUserToProject (project_id, data) {
    return axiosConfig.post(`project/${project_id}/invite`, data);
}