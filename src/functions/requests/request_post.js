import api from "services/api";
import { alertDispatch } from "store/dispatchs/dispatchs";

export const saveProject = async (
  idUser,
  idProject,
  listProjects,
  setListProjects,
  isList,
  project,
  setProject,
  setLoading
) => {
  try {
    const response = await api.post(`/project-save/register`, {
      idUser,
      idProject,
    });
    alertDispatch("success", response.data.message);
    if (isList) {
      var newList = listProjects.map((item) => {
        if (item.id == idProject) item.projectSaveId = response.data.id;
        return item;
      });
      setListProjects(newList);
    } else {
      setProject({ ...project, projectSaveId: response.data.id });
    }
  } catch (error) {
    alertDispatch("error", error?.response?.data?.message);
  } finally {
    if (setLoading != undefined) setLoading(false);
  }
};

export const removeProject = async (
  idProject,
  projectSaveId,
  listProjects,
  setListProjects,
  isList,
  project,
  setProject,
  setLoading
) => {
  console.log("windwos");
  console.log(window.location.pathname);
  try {
    const response = await api.delete(`/project-save/${projectSaveId}`);
    alertDispatch("success", response.data.message);

    //For remove in page /my_project/saved
    if (window.location.pathname.includes("saved")) {
      var newListSaved = listProjects.filter((item) => item.id != idProject);
      setListProjects(newListSaved);
      return false;
    }

    if (isList) {
      var newList = listProjects.map((item) => {
        if (item.id == idProject) item.projectSaveId = null;
        return item;
      });
      setListProjects(newList);
    } else {
      setProject({ ...project, projectSaveId: null });
    }
  } catch (error) {
    alertDispatch("error", error?.response?.data?.message);
  } finally {
    if (setLoading != undefined) setLoading(false);
  }
};
