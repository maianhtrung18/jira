import { history } from "../../App"
import { LOGIN, TOKEN, USER_INFO } from "../../ulti/setting"

export const loginAction = (thongTinUser) => {
    return (dispatch2) => {

        localStorage.setItem(TOKEN, thongTinUser.accessToken)
        localStorage.setItem(USER_INFO, JSON.stringify(thongTinUser))
        let action = {
            type: LOGIN,
            data: thongTinUser
        }
        dispatch2(action)
        history.push('/home')
    }
}