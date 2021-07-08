import api from "services/api";
import { alertDispatch } from "store/dispatchs/dispatchs";

export const getProjects = (
  tab,
  setListProjects,
  page,
  limit,
  setTotalResults,
  setLastPage,
  query,
  idType,
  idUser,
  idState,
  idCity,
  setLoading
) => {
  var url = "/projects";
  if (tab == "saved") url = "/projects-save";
  api
    .get(url, {
      params: {
        page,
        limit,
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
        setTotalResults(response.data.totalResults);
        setLastPage(response.data.lastPage);
      }
    })
    .catch((error) => {
      alertDispatch("error", error?.response?.data?.message);
    })
    .finally(() => setLoading(false));
};
