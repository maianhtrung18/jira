import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { createTaskReducer } from "./reducers/createTaskReducer";
import { EditUserReducer } from "./reducers/EditUserReducer";
import { loginReducer } from "./reducers/loginReducer";
import { ProjectManagementReducer } from "./reducers/ProjectManagementReducer";
import { UserJiraReducer } from "./reducers/UserJiraReducer";




const rootReducer = combineReducers({
    loginReducer,
    UserJiraReducer,
    EditUserReducer,
    createTaskReducer,
    ProjectManagementReducer
    
})

export const store = createStore(rootReducer, applyMiddleware(thunk))