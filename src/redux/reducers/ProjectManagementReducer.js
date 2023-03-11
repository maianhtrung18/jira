import { GET_PROJECT, SEARCH_PROJECT } from "../../ulti/setting"

const initialState = [[],[],'']

export const ProjectManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECT:
             let listSearchGet = action.data.filter((project) => {
                return project.name.toLowerCase().match(state[2].toLowerCase())
            })
            return [[...listSearchGet], [...action.data], state[2]]

        case SEARCH_PROJECT:
            let listSearch = state[1].filter((project) => {
                return project.name.toLowerCase().match(action.keyword.toLowerCase())
            })
            return [[...listSearch], [...state[1]], action.keyword]

        default:
            return state
    }
}

