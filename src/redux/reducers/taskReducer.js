const initialState = {
    taskDetail: {
        "priorityTask": {
            "priorityId": 2,
            "priority": "Medium"
        },
        "taskTypeDetail": {
            "id": 2,
            "taskType": "new task"
        },
        "assigness": ['a','b','c'],
        "lstComment": [
            {
                "id": 8159,
                "idUser": 4399,
                "name": "Thanh Quang Tran",
                "avatar": "https://ui-avatars.com/api/?name=Thanh Quang Tran",
                "commentContent": "<p>abc</p>"
            }
        ],
        "taskId": 9393,
        "taskName": "fix lỗi",
        "alias": "fix-loi",
        "description": "<p>fghfhfh</p>",
        "statusId": "1",
        "originalEstimate": 0,
        "timeTrackingSpent": 0,
        "timeTrackingRemaining": 0,
        "typeId": 0,
        "priorityId": 0,
        "projectId": 12017
    }
}


export const taskReducer = (state = initialState, action) => {
    switch (action.type) {


        default:
            return state
    }
}
