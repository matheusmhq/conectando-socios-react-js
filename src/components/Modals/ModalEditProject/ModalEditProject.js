import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from "react-bootstrap";

import InputDefault from "components/Form/Inputs/InputDefault";
import TextareaDefault from "components/Form/Inputs/TextareaDefault";
import DropdownDefault from "components/Form/Dropdowns/DropdownDefault";
import BtnDefault from "components/Form/Buttons/BtnDefault";
import { getTypes } from "functions/requests/requestGet";
import Loading from "components/Loading/Loading";
import { update } from "./js/api";

const ModalEditProject = ({
  setShowModalEditProject,
  showModalEditProject,
  project,
  setProject,
}) => {
  const [loading, setLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [idType, setIdType] = useState(project.idType);
  const [typeName, setTypeName] = useState("");
  const [description, setDescription] = useState(project.description);
  const [optionsTypes, setOptionsTypes] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    getTypes(setOptionsTypes, setLoading);
  }, []);

  const CloseModal = () => {
    setShowModalEditProject(false);
  };

  const Update = () => {
    update(
      title,
      idType,
      typeName,
      description,
      project,
      setProject,
      setShowModalEditProject,
      setErrors,
      setLoadingSave
    );
  };

  useEffect(() => {
    var found = optionsTypes.find((item) => item.id == idType);
    if (found != undefined) setTypeName(found.name);
  }, [idType, optionsTypes]);

  return (
    <Modal
      show={showModalEditProject}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-edit-project"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Editar projeto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Col md={8}>
                <InputDefault
                  label={"Título"}
                  name={"title"}
                  placeholder="Informe o título"
                  required={true}
                  onchange={setTitle}
                  value={title}
                  errors={errors}
                />
              </Col>

              <Col md={4}>
                <DropdownDefault
                  label={"Categoria"}
                  name={"type"}
                  required={true}
                  onchange={setIdType}
                  value={idType}
                  options={optionsTypes}
                  errors={errors}
                />
              </Col>

              <Col md={12}>
                <TextareaDefault
                  rows={10}
                  label={"Descrição"}
                  name={"description"}
                  placeholder="Descreva o projeto com detalhes"
                  required={true}
                  onchange={setDescription}
                  value={description}
                  errors={errors}
                />
              </Col>
            </>
          )}
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Row className="w-100 d-flex justify-content-end">
          <Col xs={6} md={4} lg={2}>
            <BtnDefault
              variant="outline-secondary"
              title={"Cancelar"}
              block={true}
              onclick={CloseModal}
            />
          </Col>

          <Col xs={6} md={4} lg={2}>
            <BtnDefault
              loading={loadingSave}
              title={"Salvar"}
              block={true}
              onclick={Update}
            />
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditProject;
