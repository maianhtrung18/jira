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

export const getAllProject = () => {
    return axios({
        method: 'get',
        url: `${process.env.REACT_APP_DOMAIN}/api/Project/getAllProject`,
        headers: {
            TokenCybersoft: studentToken
        },
    });
}

export const deleteProject = (id, token) => {
    return axios({
        method: 'delete',
        url: `${process.env.REACT_APP_DOMAIN}/api/Project/deleteProject`,
        params:{
            projectId: id
        },
        headers: {
            TokenCybersoft: studentToken,
            Authorization: `Bearer ${token}`
        },
    });
}

export const getProjectInfo = (id, token) => {
    return axios({
        method: 'get',
        url: `${process.env.REACT_APP_DOMAIN}/api/Project/getProjectDetail`,
        params:{
            id: id
        },
        headers: {
            TokenCybersoft: studentToken,
            Authorization: `Bearer ${token}`
        },
    });
}

export const updateProject = (id, token, data) => {
    return axios({
        method: 'put',
        url: `${process.env.REACT_APP_DOMAIN}/api/Project/updateProject`,
        params:{
            projectId: id
        },
        headers: {
            TokenCybersoft: studentToken,
            Authorization: `Bearer ${token}`
        },
        data: data
    });
}

export const createProject = (token, data) => {
    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_DOMAIN}/api/Project/createProjectAuthorize`,
        headers: {
            TokenCybersoft: studentToken,
            Authorization: `Bearer ${token}`
        },
        data: data
    });
}

export const getProjectCategory = () => {
    return axios({
        method: 'get',
        url: `${process.env.REACT_APP_DOMAIN}/api/ProjectCategory`,
        headers: {
            TokenCybersoft: studentToken,
        }
    });
}


export const removeUserFromProject = (token, data) => {
    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_DOMAIN}/api/Project/removeUserFromProject`,
        headers: {
            TokenCybersoft: studentToken,
            Authorization: `Bearer ${token}`
        },
        data: data
    });
}

export const getUsers = (token) => {
    return axios({
        method: 'get',
        url: `${process.env.REACT_APP_DOMAIN}/api/Users/getUser`,
        headers: {
            TokenCybersoft: studentToken,
            Authorization: `Bearer ${token}`
        }
    });
}

export const assignUserProject = (token, data) => {
    return axios({
        method: 'post',
        url: `${process.env.REACT_APP_DOMAIN}/api/Project/assignUserProject`,
        headers: {
            TokenCybersoft: studentToken,
            Authorization: `Bearer ${token}`
        },
        data: data
    });
}

export const getProjectDetail = (token, id) => {
      return axios({
        method: 'get',
        url: `${process.env.REACT_APP_DOMAIN}/api/Project/getProjectDetail`,
        params:{
            id,
        },
        headers: {
            TokenCybersoft: studentToken,
            Authorization: `Bearer ${token}`
        }
    });

}