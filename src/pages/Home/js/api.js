import api from "services/api";
import { alertDispatch } from "store/dispatchs/dispatchs";

export const getProjects = (
  setListProjects,
  query,
  idType,
  idUser,
  idState,
  idCity,
  setLoading
) => {
  api
    .get(`/projects`, {
      params: {
        query,
        idType,
        idUser,
        idState,
        idCity,
        all: true,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        setListProjects(response.data.data);
      }
    })
    .catch((error) => {
      alertDispatch("error", error?.response?.data?.message);
    })
    .finally(() => setLoading(false));
};
