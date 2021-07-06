import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import InputDefault from "components/Form/Inputs/InputDefault";
import TextareaDefault from "components/Form/Inputs/TextareaDefault";
import DropdownDefault from "components/Form/Dropdowns/DropdownDefault";
import BtnDefault from "components/Form/Buttons/BtnDefault";
import { getTypes } from "functions/requests/request_get";
import Loading from "components/Loading/Loading";
import { save } from "./js/api";

function PublishProject({ history }) {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [title, setTitle] = useState("");
  const [idType, setIdType] = useState(0);
  const [description, setDescription] = useState("");
  const [optionsTypes, setOptionsTypes] = useState([]);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    getTypes(setOptionsTypes, setLoading);
  }, []);

  const Save = () => {
    save(title, idType, description, user, history, setErrors, setLoadingSave);
  };

  if (loading) return <Loading customClass="mt-4" />;
  else {
    return (
      <Container>
        <div>
          <div className="bg-white my-5 p-4 container-publish-project">
            <h4 className="title-default ml-0">Publicar um novo projeto</h4>

            <Row>
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

              <Col md={12}>
                <BtnDefault
                  loading={loadingSave}
                  size={"lg"}
                  title={"Publicar"}
                  block={true}
                  onclick={Save}
                />
              </Col>
            </Row>
          </div>
        </div>
      </Container>
    );
  }
}

export default PublishProject;
