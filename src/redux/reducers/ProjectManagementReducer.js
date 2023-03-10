import { GET_PROJECT } from "../../ulti/setting"

const initialState = []

export const ProjectManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECT:
            // console.log(action.data)
            return [...action.data]

        default:
            return state
    }
}

