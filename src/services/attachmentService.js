import axiosConfig from './axiosConfig'

//Get attachments by project
export function getAttachments (project_id, currentPage) {
    return axiosConfig.get(`attachments/project/${project_id}/page/${currentPage}/get`);
}

//Remove attachment
export function removeAttachment (attachment_id) {
    return axiosConfig.delete(`attachment/${attachment_id}/remove`);
}

//Add attachment
export function addAttachments (project_id) {
    return axiosConfig.post(`attachments/project/${project_id}/add`);
}