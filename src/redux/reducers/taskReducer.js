import { GET_TASK_DETAIL } from "../../ulti/constants"

const initialState = {
    taskDetail: {
        "priorityTask": {
            "priorityId": "",
            "priority": ""
        },
        "taskTypeDetail": {
            "id": "",
            "taskType": ""
        },
        "assigness": [],
        "lstComment": [
            {
                "id": 8159,
                "idUser": 4399,
                "name": "Thanh Quang Tran",
                "avatar": "https://ui-avatars.com/api/?name=Thanh Quang Tran",
                "commentContent": "<p>abc</p>"
            }
        ],
        "taskId": "",
        "taskName": "",
        "alias": "",
        "description": "<p>fghfhfh</p>",
        "statusId": "",
        "originalEstimate": 0,
        "timeTrackingSpent": 0,
        "timeTrackingRemaining": 0,
        "typeId": "",
        "priorityId": "",
        "projectId": ""
    }
}


export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_DETAIL:
            state.taskDetail = action.data
            return {...state}
        default:
            return state
    }
}
