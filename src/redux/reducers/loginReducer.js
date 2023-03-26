import { history } from "../../App"
import { LOGIN, LOGOUT, USER_INFO } from "../../ulti/setting"

let userInfo = JSON.parse(localStorage.getItem(USER_INFO)) 

const initialState = userInfo

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {

        case LOGIN:
            return { ...action.data }

        case LOGOUT:
            localStorage.clear()
            history.go(0)
            return null

        default:
            return state
    }
}
