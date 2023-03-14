import { CLOSE_DRAWER, OPEN_DRAWER } from "../../ulti/constants"

const initialState = {
    visible: false,
}

export const createTaskReducer = (state = initialState, action) => {
    switch (action.type) {

        case OPEN_DRAWER:
            return { ...state, visible: true }

        case CLOSE_DRAWER:
            return { ...state, visible: false}

        default:
            return state
    }
}
