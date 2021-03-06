import { store } from "store/index";

export const userDispatch = (data) => {
  store.dispatch({ type: "CS_USER_LOGIN", data });
};

export const userLogoutDispatch = () => {
  store.dispatch({ type: "CS_USER_LOGOUT" });
};

export const alertDispatch = (type, msg) => {
  store.dispatch({ type: "SHOW_ALERT", options: { type, msg } });
};
