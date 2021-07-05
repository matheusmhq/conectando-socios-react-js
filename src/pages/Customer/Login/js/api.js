import api from "services/api";
import { alertDispatch, userDispatch } from "store/dispatchs/dispatchs";
import { validationFields } from "functions/validation";
import { SaveLogged } from "functions/storage";

export const signIn = (email, password, history, setErrors, setLoadingSave) => {
  if (!validationFields(setErrors)) return false;
  setLoadingSave(true);
  api
    .post(`/user/login`, {
      email,
      password,
    })
    .then((response) => {
      if (response.status == 200) {
        userDispatch(response.data.user);
        SaveLogged();
        history.push("/");
      }
    })
    .catch((error) => {
      alertDispatch("error", error?.response?.data?.message);
    })
    .finally(() => setLoadingSave(false));
};
