import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { EditUserReducer } from "./reducers/EditUserReducer";
import { loginReducer } from "./reducers/loginReducer";
import { UserJiraReducer } from "./reducers/UserJiraReducer";




const rootReducer = combineReducers({
    loginReducer,
    UserJiraReducer,
    EditUserReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))