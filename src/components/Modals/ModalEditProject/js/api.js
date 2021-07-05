import api from "services/api";
import { alertDispatch } from "store/dispatchs/dispatchs";
import { validationFields } from "functions/validation";

export const update = (
  title,
  idType,
  typeName,
  description,
  project,
  setProject,
  setShowModalEditProject,
  setErrors,
  setLoadingSave
) => {
  if (!validationFields(setErrors)) return false;
  setLoadingSave(true);
  api
    .put(`/project/${project.id}/update`, {
      title,
      idType,
      description,
    })
    .then((response) => {
      if (response.status == 200) {
        setProject({ ...project, title, idType, typeName, description });
        setShowModalEditProject(false);
        alertDispatch("success", response.data.message);
      }
    })
    .catch((error) => {
      alertDispatch("error", error?.response?.data?.message);
    })
    .finally(() => setLoadingSave(false));
};
