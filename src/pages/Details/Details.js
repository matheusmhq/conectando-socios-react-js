import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";

import AvatarDefault from "components/Avatar/AvatarDefault";
import { saveProject, removeProject } from "functions/requests/request_post";
import { getProject, deleteProject } from "./js/api";
import Loading from "components/Loading/Loading";
import ModalEditProject from "components/Modals/ModalEditProject/ModalEditProject";
import ModalDeleteProject from "components/Others/ModalConfirmDelete";
import Social from "components/Others/Social";

function Details({ history }) {
  const user = useSelector((state) => state.user);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({});
  const [showModalEditProject, setShowModalEditProject] = useState(false);
  const [showModalDeleteProject, setShowModalDeleteProject] = useState(false);

  useEffect(() => {
    getProject(id, setProject, user, setLoading);
  }, []);

  const DeleteProject = () => {
    setShowModalDeleteProject(false);
    deleteProject(project);
  };

  if (loading) return <Loading customClass="mt-5" />;
  else {
    return (
      <Container fluid className="full-height">
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
        <Card className="my-5 card-project">
          <Card.Body>
            <Card.Title className="d-flex justify-content-between">
              <div
                className={`project-container-title ${
                  user.data?.id != project.idUser && "w-100"
                }`}
              >
                <h2 className="project-title limit-line-2">{project.title}</h2>
              </div>

              {user.data?.id == project.idUser && (
                <div className="project-container-details">
                  <div className="d-flex">
                    <Button
                      block={true}
                      variant="primary"
                      onClick={() => setShowModalEditProject(true)}
                    >
                      Editar
                    </Button>

                    <Button
                      block={true}
                      variant="danger"
                      onClick={() => setShowModalDeleteProject(true)}
                      className="mt-0 ml-1"
                    >
                      Deletar
                    </Button>
                  </div>
                </div>
              )}
            </Card.Title>
            <div className="d-flex align-items-center mb-3">
              <p className="mb-0 mr-3 project-date">
                Publicado:{" "}
                <strong>
                  {moment(project.createdAt).format("DD/MM/YYYY")}
                </strong>
              </p>
              <div className="project-tag">
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
                <p className="mb-0 ml-1">{project.name}</p>
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
              >
                <FontAwesomeIcon
                  color={"red"}
                  size={"lg"}
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
