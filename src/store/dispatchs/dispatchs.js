import { store } from "store/index";

export const userDispatch = (data) => {
  store.dispatch({ type: "CS_USER_LOGIN", data });
};

export const alertDispatch = (type, msg) => {
  console.log("type " + type);
  console.log("msg " + msg);
  store.dispatch({ type: "SHOW_ALERT", options: { type, msg } });
};
