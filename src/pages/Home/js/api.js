import api from "services/api";
import { alertDispatch } from "store/dispatchs/dispatchs";

export const getProjects = (
  setListProjects,
  page,
  perPage,
  setTotalResults,
  setLastPage,
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
        page,
        perPage,
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
        console.log("getProjects");
        console.log(response.data);
        setListProjects(response.data.data);
        setTotalResults(response.data.totalResults);
        setLastPage(response.data.lastPage);
      }
    })
    .catch((error) => {
      alertDispatch("error", error?.response?.data?.message);
    })
    .finally(() => setLoading(false));
};
