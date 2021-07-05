import api from "services/api";
import { alertDispatch } from "store/dispatchs/dispatchs";
import { validationFields } from "functions/validation";

export const save = (
  name,
  email,
  cep,
  idState,
  idCity,
  address,
  number,
  district,
  complement,
  whatsapp,
  facebook,
  linkedin,
  twitter,
  instagram,
  password,
  confirmPassword,
  history,
  setErrors,
  setLoadingSave
) => {
  if (!validationFields(setErrors)) return false;
  if (password.length < 8) {
    alertDispatch("error", "Senha muito curta!");
    return false;
  }
  if (password != confirmPassword) {
    alertDispatch("error", "As senhas não conferem");
    return false;
  }
  setLoadingSave(true);
  api
    .post(`/user/register`, {
      name,
      email,
      cep,
      idState,
      idCity,
      address,
      number,
      district,
      complement,
      whatsapp,
      facebook,
      linkedin,
      twitter,
      instagram,
      password,
    })
    .then((response) => {
      if (response.status == 200) {
        alertDispatch("success", response.data.message);
        history.push("/login");
      }
    })
    .catch((error) => {
      alertDispatch("error", error?.response?.data?.message);
    })
    .finally(() => setLoadingSave(false));
};
