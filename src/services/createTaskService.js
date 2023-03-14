import axios from "axios"
import { TOKEN_CYBER, URL_API } from "../ulti/constants"

export const getStatusService = () => {
    return axios({
        method: 'GET',
        url: `${URL_API}/Status/getAll`,
        headers: {
            'TokenCybersoft': TOKEN_CYBER
        }
    })
}
