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

export const updateTimeTrackingService = (idTask, timeSpent, timeRemain) => {
    return axios({
        method:'PUT',
        url: `${URL_API}/Project/updateTimeTracking`,
        data: {
            "taskId": idTask,
            "timeTrackingSpent": timeSpent,
            "timeTrackingRemaining": timeRemain
        },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
            'TokenCybersoft': TOKEN_CYBER
        }
    })
}

export const insertCommentService = (idTask, content) => {
    return axios({
        method: 'POST',
        url: `${URL_API}/Comment/insertComment`,
        data: {
            "taskId": idTask,
            "contentComment": content   
        },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
            'TokenCybersoft': TOKEN_CYBER
        }
    })
}

export const updateCommentService = (idCom, content) => {
    return axios({
        method: 'PUT',
        url: `${URL_API}/Comment/updateComment?id=${idCom}&contentComment=${content}`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
            'TokenCybersoft': TOKEN_CYBER
        }
    })
}

export const deleteCommentService = (idCom) => {
    return axios({
        method: 'DELETE',
        url: `${URL_API}/Comment/deleteComment?idComment=${idCom}`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
            'TokenCybersoft': TOKEN_CYBER
        }
    })
}
