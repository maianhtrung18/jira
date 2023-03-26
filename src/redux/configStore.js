import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createTaskReducer } from "./reducers/createTaskReducer";
import { EditUserReducer } from "./reducers/EditUserReducer";
import { loginReducer } from "./reducers/loginReducer";
import { projectReducer } from "./reducers/projectDetailReducer";
import { ProjectManagementReducer } from "./reducers/ProjectManagementReducer";
import { taskReducer } from "./reducers/taskReducer";
import { UserJiraReducer } from "./reducers/UserJiraReducer";


const rootReducer = combineReducers({
    loginReducer,
    UserJiraReducer,
    EditUserReducer,
    createTaskReducer,
    ProjectManagementReducer,
    taskReducer, 
    projectReducer
    
})

export const store = createStore(rootReducer, applyMiddleware(thunk))