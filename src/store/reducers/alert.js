const INITIAL_STATE = {
  options: {},
};

function alert(state = INITIAL_STATE, action) {
  if (action.type === "SHOW_ALERT") {
    return { ...state, options: action.options };
  } else if (action.type === "HIDDEN_ALERT") {
    state = INITIAL_STATE;
  }

  return state;
}

export default alert;
