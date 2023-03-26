import { getTaskDetailService } from "../../services/editTaskService"
import { GET_TASK_DETAIL } from "../../ulti/constants";


export const getTaskDetailAction = (id) => {
    return (dispatch2) => {
        let taskDetail = getTaskDetailService(id);
        taskDetail.then((res) => {
            let action = {
                type: GET_TASK_DETAIL,
                data: res.data.content
            }
            dispatch2(action)
        })
        taskDetail.catch((err) => {
            console.log(err)
        })        
    }
}