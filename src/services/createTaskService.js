import axios from "axios"
import { TOKEN_CYBER, URL_API } from "../ulti/constants"
import { TOKEN } from "../ulti/setting"

export const getStatusService = () => {
    return axios({
        method: 'GET',
        url: `${URL_API}/Status/getAll`,
        headers: {
            'TokenCybersoft': TOKEN_CYBER
        }
    })
}

export const getPriorityService = () => {
    return axios({
        method:'GET',
        url:`${URL_API}/Priority/getAll?id=0`,
        headers: {
            'TokenCybersoft': TOKEN_CYBER
        }
    })
}

export const getTaskTypeService = () => {
    return axios({
        method:'GET',
        url:`${URL_API}/TaskType/getAll`,
        headers: {
            'TokenCybersoft': TOKEN_CYBER
        }
    })
}

export const getUserByProject = (id) => {
    return axios({
        method:'GET',
        url: `${URL_API}/Users/getUserByProjectId?idProject=${id}`,  
        headers: {
            'TokenCybersoft': TOKEN_CYBER,
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
        }
    })
}

export const createTaskService = (task) => {
    return axios({
        method: 'POST',
        url: `${URL_API}/Project/createTask`,
        data: task,
        headers: {
            'TokenCybersoft': TOKEN_CYBER,
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
        }
    })
}