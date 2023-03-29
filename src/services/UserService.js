import axios from "axios"
import { ACCESS_TOKEN, TOKEN_CYBER, URL_API } from "../ulti/constants"
import { TOKEN } from "../ulti/setting"

export const DeleteUser = (idUser) => {
    return axios({
        method: 'DELETE',
        url: `${URL_API}/Users/deleteUser?id=${idUser}`,
        headers:{
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
            'TokenCybersoft': TOKEN_CYBER 
        }
    })
}

export const EditUser = (userEdit) => {
    return axios({
        method:'PUT',
        url: `${URL_API}/Users/editUser`,
        data: userEdit,
        headers:{
            'TokenCybersoft': TOKEN_CYBER
        }
    })
}

export const getUserByProject = (id) => {
    return axios({
        method: 'GET',
        url: `${URL_API}/Users/getUserByProjectId?idProject=${id}`,
        headers:{
            'TokenCybersoft': TOKEN_CYBER,
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
        }
    })
}
