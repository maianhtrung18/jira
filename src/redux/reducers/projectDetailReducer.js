import { GET_PROJECT_DETAIL, SEARCH_TASKS } from "../../ulti/setting"

const initialState = [{}, [], '']

export const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_TASKS:
            let listTask = state[0].lstTask.map((ele) => {
                let tasks = ele.lstTaskDeTail.filter((task) => {
                    return task.taskName.toLowerCase().match(action.data.toLowerCase())
                })
                ele = { ...ele, lstTaskDeTail: [...tasks] }
                return { ...ele }
            })
            return [{ ...state[0] }, [...listTask], action.data]

        case GET_PROJECT_DETAIL:
            if (action.data) {
                if ((action.data.id === state[0].id || !state[0].id) || (action.data.id !== state[0].id) & !action.noRender) {
                    let listTask = action.data.lstTask.map((ele) => {
                        let tasks = ele.lstTaskDeTail.filter((task) => {
                            return task.taskName.toLowerCase().match(state[2].toLowerCase())
                        })
                        ele.lstTaskDeTail = [...tasks]
                        return { ...ele }
                    })
                    return [{ ...action.data }, [...listTask], '']
                }
                else {
                    return [state[0], state[1], state[2]]
                }
            }
            else {
                return { ...state }
            }

        default:
            return state
    }
}
