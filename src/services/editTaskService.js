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