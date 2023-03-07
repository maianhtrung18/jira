const initialState = {
    userList: []
}

export const UserJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_LIST":
        state.userList = action.data
        state.userList = [...state.userList]
        return {...state}

  default:
    return {...state}
  }
}
