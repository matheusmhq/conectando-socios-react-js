import api from "services/api";
import { alertDispatch } from "store/dispatchs/dispatchs";
import { validationFields } from "functions/validation";

export const save = (
  title,
  setTitle,
  idType,
  setIdType,
  description,
  setDescription,
  user,
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
        setTitle("");
        setIdType(0);
        setDescription("");
        alertDispatch("success", response.data.message);
      }
    })
    .catch((error) => {
      alertDispatch("error", error?.response?.data?.message);
    })
    .finally(() => setLoadingSave(false));
};
