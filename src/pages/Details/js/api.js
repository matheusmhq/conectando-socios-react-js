import api from "services/api";
import { alertDispatch } from "store/dispatchs/dispatchs";

export const getProject = (id, setProject, user, history, setLoading) => {
  setLoading(true);
  api
    .get(`/project/${id}`, {
      params: {
        idUser: user.data.id,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        setProject(response.data.project);
      }
    })
    .catch((error) => {
      alertDispatch("error", error?.response?.data?.message);
      history.push("/");
    })
    .finally(() => setLoading(false));
};

export const deleteProject = (project, history) => {
  api
    .delete(`/project/${project.id}`)
    .then((response) => {
      if (response.status == 200) {
        alertDispatch("success", response.data.message);
        history.push("/");
      }
    })
    .catch((error) => {
      alertDispatch("error", error?.response?.data?.message);
    });
};
