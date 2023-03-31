import { GET_TASK_DETAIL, GET_USER_BYPROJECT, UPDATE_ASSIGNEE, UPDATE_COMMENT, UPDATE_DESC, UPDATE_ESTIMATE, UPDATE_TASKNAME, UPDATE_TIMETRACKING } from "../../ulti/constants"

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
        "taskName": "123",
        "alias": "",
        "description": "<p>fghfhfh</p>",
        "statusId": "",
        "originalEstimate": 0,
        "timeTrackingSpent": 0,
        "timeTrackingRemaining": 0,
        "typeId": "",
        "priorityId": "",
        "projectId": ""
    },
    userList: [
        {
            "userId": "",
            "name": "",
            "avatar": "",
            "email":"",
            "phoneNumber":""
          },
    ],
    desc: "",
    listAssign: [],
}


export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_DETAIL:
            state.taskDetail = action.data
            return {...state}
        case GET_USER_BYPROJECT:
            state.userList = action.data
            state.userList = [...state.userList]
            return {...state}
        case UPDATE_TASKNAME:
            state.taskDetail.taskName = action.data
            state.taskDetail = {...state.taskDetail}
            return {...state}
        case UPDATE_DESC:
            state.desc = action.data
            return {...state}
        case UPDATE_ESTIMATE:
            state.taskDetail.originalEstimate = action.data
            console.log(action.data)
            state.taskDetail = {...state.taskDetail}
            return {...state}
        case UPDATE_COMMENT:
            let index = state.taskDetail.lstComment.findIndex((com) => {
                return com.id === action.data.idCom
            })
            console.log(index,"index")
            //console.log(action.data.value,"comment")
            let arrayCom = state.taskDetail.lstComment
            arrayCom[index].commentContent = action.data.value
            state.taskDetail.lstComment = [...state.taskDetail.lstComment]
            state.taskDetail = {...state.taskDetail}
            return {...state}
        case UPDATE_TIMETRACKING:
            state.taskDetail.timeTrackingSpent = action.data
            state.taskDetail = {...state.taskDetail}
            return {...state}
        default:
            return state
    }
}
