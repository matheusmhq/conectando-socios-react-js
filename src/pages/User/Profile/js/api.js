import api from "services/api";
import { alertDispatch, userDispatch } from "store/dispatchs/dispatchs";
import { validationFields } from "functions/validation";

export const update = (
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
  user,
  setErrors,
  setLoadingSave
) => {
  if (!validationFields(setErrors)) return false;
  setLoadingSave(true);
  api
    .put(`/user/${user.data.id}/update`, {
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
    })
    .then((response) => {
      if (response.status == 200) {
        alertDispatch("success", response.data.message);
        var obj = {
          id: user.data.id,
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
          createdAt: user.data.createdAt,
          updateAt: user.data.updateAt,
        };
        userDispatch(obj);
      }
    })
    .catch((error) => {
      alertDispatch("error", error?.response?.data?.message);
    })
    .finally(() => setLoadingSave(false));
};
