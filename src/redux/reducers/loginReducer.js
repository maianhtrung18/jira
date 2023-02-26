import { LOGIN, USER_INFO } from "../../ulti/setting"

let userInfo = JSON.parse(localStorage.getItem(USER_INFO)) 

const initialState = userInfo

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN:
            return { ...action.data }

        default:
            return state
    }
}
