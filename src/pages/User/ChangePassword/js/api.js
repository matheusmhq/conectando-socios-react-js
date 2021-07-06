import api from "services/api";
import { alertDispatch, userDispatch } from "store/dispatchs/dispatchs";
import { validationFields } from "functions/validation";

export const update = (
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  user,
  setErrors,
  setLoadingSave
) => {
  if (!validationFields(setErrors)) return false;
  if (newPassword.length < 8) {
    alertDispatch("error", "Senha muito curta!");
    return false;
  }
  if (newPassword != confirmPassword) {
    alertDispatch("error", "As senhas não conferem");
    return false;
  }
  setLoadingSave(true);
  api
    .post(`/user/change-password`, {
      idUser: user.data.id,
      currentPassword,
      newPassword,
    })
    .then((response) => {
      if (response.status == 200) {
        alertDispatch("success", response.data.message);
      }
    })
    .catch((error) => {
      alertDispatch("error", error?.response?.data?.message);
    })
    .finally(() => {
      setLoadingSave(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    });
};
