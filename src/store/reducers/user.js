const INITIAL_STATE = {
  data: {},
};

function user(state = INITIAL_STATE, action) {
  if (action.type === "CS_USER_LOGIN") {
    return { ...state, data: action.data };
  } else if (action.type === "CS_USER_LOGOUT") {
    state = INITIAL_STATE;
  }
  return state;
}

export default user;
