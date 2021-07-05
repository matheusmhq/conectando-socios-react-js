import api from "services/api";
import { alertDispatch } from "store/dispatchs/dispatchs";
import { validationFields } from "functions/validation";

export const save = (
  title,
  idType,
  description,
  user,
  history,
  setErrors,
  setLoadingSave
) => {
  if (!validationFields(setErrors)) return false;
  setLoadingSave(true);
  api
    .post(`/project/register`, {
      idUser: user.data.id,
      idType,
      title,
      description,
    })
    .then((response) => {
      if (response.status == 200) {
        alertDispatch("success", response.data.message);
        history.push(`/details/${response.data.id}`);
      }
    })
    .catch((error) => {
      alertDispatch("error", error?.response?.data?.message);
    })
    .finally(() => setLoadingSave(false));
};
