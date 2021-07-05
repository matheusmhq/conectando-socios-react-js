import api from "services/api";
import { alertDispatch } from "store/dispatchs/dispatchs";

export const getProjects = (
  setListProjects,
  query,
  idType,
  idUser,
  idState,
  idCity,
  tab,
  setLoading
) => {
  var url = "/projects";
  if (tab == "saved") url = "/projects-save";
  api
    .get(url, {
      params: {
        query,
        idType,
        idUser,
        idState,
        idCity,
        all: false,
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
