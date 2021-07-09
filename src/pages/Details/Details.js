import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Card, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faHeart as faHeartSolid,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";

import AvatarDefault from "components/Avatar/AvatarDefault";
import { saveProject, removeProject } from "functions/requests/request_post";
import { getProject, deleteProject } from "./js/api";
import Loading from "components/Loading/Loading";
import ModalEditProject from "components/Modals/ModalEditProject/ModalEditProject";
import ModalDeleteProject from "components/Modals/ModalConfirmDelete";
import Social from "components/Others/Social";

function Details({ history }) {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [showModalEditProject, setShowModalEditProject] = useState(false);
  const [showModalDeleteProject, setShowModalDeleteProject] = useState(false);

  useEffect(() => {
    getProject(id, setProject, user, history, setLoading);
  }, []);

  const DeleteProject = () => {
    setShowModalDeleteProject(false);
    deleteProject(project, history);
  };

  if (loading) return <Loading customClass="mt-5" />;
  else {
    return (
      <Container fluid className="full-height my-4 my-md-5">
        {showModalEditProject && (
          <ModalEditProject
            setShowModalEditProject={setShowModalEditProject}
            showModalEditProject={showModalEditProject}
            project={project}
            setProject={setProject}
          />
        )}
        {showModalDeleteProject && (
          <ModalDeleteProject
            setShowModalDeleteProject={setShowModalDeleteProject}
            showModalDeleteProject={showModalDeleteProject}
            title={"Tem certeza que deseja deletar esse projeto?"}
            handler={DeleteProject}
          />
        )}

        <Card className="card-project">
          <Card.Body>
            <Card.Title className="d-flex justify-content-between align-items-start">
              <div className="project-container-title">
                <h2 className="project-title">{project.title}</h2>
              </div>

              {user.data?.id == project.idUser && (
                <Dropdown
                  alignRight
                  className="container-options ml-3 d-flex justify-content-end"
                >
                  <Dropdown.Toggle variant="link" className="btn-options">
                    <FontAwesomeIcon color={"#f4f4f4 "} icon={faEllipsisV} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => setShowModalEditProject(true)}
                    >
                      Editar
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => setShowModalDeleteProject(true)}
                    >
                      Deletar
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </Card.Title>
            <div className="d-flex align-items-center mb-3">
              <p className="mb-0 mr-3 project-date">
                {project.createdAt == project.updatedAt ? (
                  <>
                    Publicado:{" "}
                    <strong>
                      {moment(project.createdAt).format("DD/MM/YYYY")}
                    </strong>
                  </>
                ) : (
                  <>
                    Editado:{" "}
                    <strong>
                      {moment(project.updatedAt).format("DD/MM/YYYY")}
                    </strong>
                  </>
                )}
              </p>
              <div title={project.typeName} className="project-tag">
                <p className="mb-0">{project.typeName}</p>
              </div>
            </div>
            <Card.Text className="project-description">
              {project.description}
            </Card.Text>
          </Card.Body>
          <div className="px-3 my-3 container-interest">
            <h5>
              Tem interesse?{" "}
              <span>Entre em contato com o dono desse projeto</span>
            </h5>
            <Social
              whatsapp={project.whatsapp}
              facebook={project.facebook}
              linkedin={project.linkedin}
              instagram={project.instagram}
              twitter={project.twitter}
              projectTitle={project.title}
            />
          </div>
          <Card.Footer className="card-footer d-flex justify-content-between bg-white">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center mr-4">
                <AvatarDefault
                  color={"#007BFF"}
                  fgColor={"white"}
                  size={26}
                  name={project.name}
                />
                <p className="mb-0 ml-1 limit-line-1 user-name">
                  {project.name}
                </p>
              </div>

              <div className="d-flex align-items-center">
                <FontAwesomeIcon color={"#007BFF"} icon={faMapMarker} />
                <p className="mb-0 ml-1">
                  {project.cityName}/{project.uf}
                </p>
              </div>
            </div>

            {user?.data?.id != project.idUser && (
              <button
                data-testid="btn-save-project"
                className="btn-empty"
                title="Salvar projeto"
                onClick={() => {
                  if (user?.data?.id == undefined) {
                    history.push("/login");
                    return false;
                  }

                  if (
                    project.projectSaveId == null ||
                    project.projectSaveId == undefined
                  ) {
                    saveProject(
                      user.data.id,
                      id,
                      {},
                      [],
                      false,
                      project,
                      setProject
                    );
                  } else {
                    removeProject(
                      id,
                      project.projectSaveId,
                      {},
                      [],
                      false,
                      project,
                      setProject
                    );
                  }
                }}
                s
              >
                <FontAwesomeIcon
                  color={"red"}
                  className="icon-heart"
                  icon={project.projectSaveId ? faHeartSolid : faHeart}
                />
              </button>
            )}
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

export default Details;
