/* eslint-disable import/no-anonymous-default-export */
import { EDIT_USER } from "../../ulti/constants"

const initialState = {
    userEdit: {
        id: "string",
        passWord: "string",
        email: "string",
        name: "string",
        phoneNumber: "string",
        passConfirm: ""
    },
    userErr : {
        id: "string",
        passWord: "string",
        email: "string",
        name: "string",
        phoneNumber: "string",
        passConfirm: "",
    }
}

export const EditUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_USER:
            state.userEdit = action.data
            return {...state}

        default:
            return {...state}
    }
}
