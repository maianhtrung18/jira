import axios from "axios";
import { studentToken } from "../types/globalConstant";


export const signUp = (data) => {
    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_DOMAIN}/api/Users/signup`,
        headers: {
            TokenCybersoft: studentToken
        },
        data: data,
    });
}

export const signIn = (data) => {
    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_DOMAIN}/api/Users/signin`,
        headers: {
            TokenCybersoft: studentToken
        },
        data: data,
    });
}