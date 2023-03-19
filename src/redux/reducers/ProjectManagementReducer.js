import { GET_PROJECT, SEARCH_PROJECT } from "../../ulti/setting"

const initialState = [[],[],'']

export const ProjectManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROJECT:
             let listSearchGet = action.data.filter((project) => {
                return project.name[0].toLowerCase().match(state[2].toLowerCase())
            })
            console.log([...listSearchGet], [...action.data], state[2])
            return [[...listSearchGet], [...action.data], state[2]]

        case SEARCH_PROJECT:
            let listSearch = state[1].filter((project) => {
                return project.name[0].toLowerCase().match(action.keyword.toLowerCase())
            })
            return [[...listSearch], [...state[1]], action.keyword]

        default:
            return state
    }
}

