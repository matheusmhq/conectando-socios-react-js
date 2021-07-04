import React from "react";
import { useSelector } from "react-redux";
import { Card, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarker,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";

import AvatarDefault from "components/Avatar/AvatarDefault";
import { saveProject, removeProject } from "functions/requests/request_post";

function CardProject({ history, ...props }) {
  const user = useSelector((state) => state.user);
  const {
    id,
    name,
    idUser,
    title,
    description,
    createdAt,
    idType,
    typeName,
    cityName,
    uf,
    projectSaveId,
    listProjects,
    setListProjects,
  } = props;
  return (
    <Card className="mb-3 card-project">
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          <div className="project-container-title">
            <h2 className="project-title limit-line-2">{title}</h2>
          </div>

          <div className="project-container-details">
            <Button block={true} variant="primary">
              Ver detalhes
            </Button>
          </div>
        </Card.Title>
        <Card.Text className="d-flex align-items-center mb-3">
          <p className="mb-0 mr-3 project-date">
            Publicado: <strong>{moment(createdAt).format("DD/MM/YYYY")}</strong>
          </p>
          <div className="project-tag">
            <p className="mb-0">{typeName}</p>
          </div>
        </Card.Text>
        <Card.Text className="project-description limit-line-3">
          {description}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="card-footer d-flex justify-content-between bg-white">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center mr-4">
            <AvatarDefault
              color={"#007BFF"}
              fgColor={"white"}
              size={26}
              name={name}
            />
            <p className="mb-0 ml-1">{name}</p>
          </div>

          <div className="d-flex align-items-center">
            <FontAwesomeIcon color={"#007BFF"} icon={faMapMarker} />
            <p className="mb-0 ml-1">
              {cityName}/{uf}
            </p>
          </div>
        </div>

        {user?.data?.id != idUser && (
          <button
            className="btn-empty"
            title="Salvar projeto"
            onClick={() => {
              if (user?.data?.id == undefined) {
                history.push("/login");
                return false;
              }

              if (projectSaveId == null || projectSaveId == undefined) {
                saveProject(user.data.id, id, listProjects, setListProjects);
              } else {
                removeProject(id, projectSaveId, listProjects, setListProjects);
              }
            }}
          >
            <FontAwesomeIcon
              color={"red"}
              size={"lg"}
              icon={projectSaveId ? faHeartSolid : faHeart}
            />
          </button>
        )}
      </Card.Footer>
    </Card>
  );
}

export default CardProject;
