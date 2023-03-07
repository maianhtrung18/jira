import axios from "axios"
import { ACCESS_TOKEN, TOKEN_CYBER, URL_API } from "../ulti/constants"
import { TOKEN } from "../ulti/setting"

export const DeleteUser = (idUser) => {
    let promise = axios({
        method: 'DELETE',
        url: `${URL_API}/Users/deleteUser?id=${idUser}`,
        headers:{
            'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
            'TokenCybersoft': TOKEN_CYBER 
        }
    })
    promise.then((result) => {
        console.log(result)
    })
    promise.catch((err) => {
        console.log(err)
    })
}