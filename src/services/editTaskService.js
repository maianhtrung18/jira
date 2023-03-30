import axios from "axios"
import { TOKEN_CYBER, URL_API } from "../ulti/constants"
import { TOKEN } from "../ulti/setting"

export const getTaskDetailService = (id) => {
    return axios({
        method: 'GET',
        url: `${URL_API}/Project/getTaskDetail?taskId=${id}`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
            'TokenCybersoft': TOKEN_CYBER
        }
    })
}

export const updateStatusService = (task, status) => {
    return axios({
        method: 'PUT',
        url: `${URL_API}/Project/updateStatus`,
        data: {
            taskId: task,
            statusId: status
        },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
            'TokenCybersoft': TOKEN_CYBER
        }
    })
}

export const updatePrioService = (task, prio) => {
    return axios({
        method: 'PUT',
        url: `${URL_API}/Project/updatePriority`,
        data: {
            taskId: task,
            priorityId: prio
        },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
            'TokenCybersoft': TOKEN_CYBER
        }
    })
}

export const updateDesService = (task, des) => {
    return axios({
        method: 'PUT',
        url: `${URL_API}/Project/updateDescription`,
        data: {
            taskId: task,
            description: des
        },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
            'TokenCybersoft': TOKEN_CYBER
        }
    })
}

export const updateEstimateService = (task, hour) => {
    return axios({
        method: 'PUT',
        url: `${URL_API}/Project/updateEstimate`,
        data: {
            taskId: task,
            originalEstimate: hour
        },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
            'TokenCybersoft': TOKEN_CYBER
        }
    })
}