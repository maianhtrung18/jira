import { getProjectDetail } from "../../services/services"
import { GET_PROJECT_DETAIL, TOKEN } from "../../ulti/setting"



export const projectDetailAction = (projectId) => {
    return (dispatch2) => {
        let token = localStorage.getItem(TOKEN)
        let projectDetail = getProjectDetail(token, projectId)
        projectDetail.then((result) => {
            let action = {
                type: GET_PROJECT_DETAIL,
                data: result.data.content
            }
            dispatch2(action)
        })
            .catch((error) => {
                console.log(error)
            })
    }
}