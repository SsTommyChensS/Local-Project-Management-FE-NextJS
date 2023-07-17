import axiosConfig from "./axiosConfig";

export function getAllTasks(project_id, currentPage) {
    return axiosConfig.get(`tasks/project/${project_id}/page/${currentPage}/get`);
}

export function getTasksByMember(project_id, member_id, currentPage) {
    return axiosConfig.get(`tasks/project/${project_id}/member/${member_id}/page/${currentPage}/get`);
}

export function getTasksByStatus(project_id, status, currentPage) {
    return axiosConfig.get(`tasks/project/${project_id}/status/${status}/page/${currentPage}/get`);
}

export function getTasksByTitle(project_id, title, currentPage) {
    return axiosConfig.get(`tasks/project/${project_id}/title/${title}/page/${currentPage}/get`);
}

export function addTask(project_id, data) {
    return axiosConfig.post(`task/project/${project_id}/add`, data);
}

export function updateTask(task_id, data) {
    return axiosConfig.put(`task/${task_id}/update`, data);
}

export function removeTask(task_id) {
    return axiosConfig.delete(`task/${task_id}/remove`);
}