import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import InputDefault from "components/Form/Inputs/InputDefault";
import DropdownDefault from "components/Form/Dropdowns/DropdownDefault";
import BtnDefault from "components/Form/Buttons/BtnDefault";
import Loading from "components/Loading/Loading";
import { DisablePaste } from "functions/utils";
import {
  getAddress,
  getCity,
  getState,
  verifyEmail,
} from "functions/requests/requestGet";
import { save } from "./js/api";

function Register({ history }) {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [idState, setIdState] = useState(0);
  const [idCity, setIdCity] = useState(0);
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [district, setDisctric] = useState("");
  const [complement, setComplement] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);
  const [errors, setErrors] = useState("");

  const [optionsState, setOptionsState] = useState([]);
  const [optionsCity, setOptionsCity] = useState([]);

  useEffect(() => {
    if (user?.data?.id != undefined) history.push("/");
  }, []);

  useEffect(() => {
    getCity(setOptionsCity, setLoading);
    getState(setOptionsState);
    DisablePaste();
  }, []);

  const VerifyEmailLocal = () => {
    verifyEmail(email, setEmail);
  };

  const LoadAddress = () => {
    getAddress(
      cep,
      setAddress,
      setDisctric,
      setComplement,
      setIdState,
      setIdCity,
      optionsState,
      optionsCity
    );
  };

  const Save = () => {
    save(
      name,
      email,
      cep,
      idState,
      idCity,
      address,
      number,
      district,
      complement,
      whatsapp,
      facebook,
      linkedin,
      twitter,
      instagram,
      password,
      confirmPassword,
      history,
      setErrors,
      setLoadingSave
    );
  };

  if (loading)
    return (
      <div className="main-login">
        <Loading customClass="pt-5" />
      </div>
    );
  else {
    return (
      <div className="main-login d-flex justify-content-center align-items-center">
        <Container fluid>
          <div className="container-login py-5 p-4" style={{ maxWidth: 1144 }}>
            <h1 className="mb-4 mb-md-5">Fa??a seu cadastro</h1>

            <Row className="w-100">
              <Col md={6}>
                <InputDefault
                  label={"Nome Completo"}
                  name={"name"}
                  placeholder="Informe o nome completo"
                  required={true}
                  onChange={setName}
                  value={name}
                  errors={errors}
                />
              </Col>

              <Col md={6}>
                <InputDefault
                  label={"E-mail"}
                  name={"email"}
                  placeholder="Informe o e-mail"
                  required={true}
                  onChange={setEmail}
                  value={email}
                  onBlur={VerifyEmailLocal}
                  errors={errors}
                />
              </Col>

              <Col md={4}>
                <InputDefault
                  mask={"99999-999"}
                  label={"Cep"}
                  name={"cep"}
                  required={true}
                  onChange={setCep}
                  value={cep}
                  onBlur={LoadAddress}
                  errors={errors}
                />
              </Col>

              <Col md={4}>
                <DropdownDefault
                  label="UF"
                  name={"uf"}
                  required={true}
                  options={optionsState}
                  onChange={setIdState}
                  value={idState}
                  errors={errors}
                />
              </Col>

              <Col md={4}>
                <DropdownDefault
                  label="Cidade"
                  name={"city"}
                  required={true}
                  options={optionsCity}
                  onChange={setIdCity}
                  value={idCity}
                  errors={errors}
                />
              </Col>

              <Col md={12}>
                <InputDefault
                  label={"Logradouro"}
                  name={"address"}
                  placeholder="Informe o logradouro"
                  required={true}
                  onChange={setAddress}
                  value={address}
                  errors={errors}
                />
              </Col>

              <Col md={4}>
                <InputDefault
                  label={"N??mero"}
                  name={"number"}
                  placeholder="Informe o n??mero"
                  required={true}
                  onChange={setNumber}
                  value={number}
                  errors={errors}
                />
              </Col>

              <Col md={4}>
                <InputDefault
                  label={"Bairro"}
                  name={"district"}
                  placeholder="Informe o bairro"
                  required={true}
                  onChange={setDisctric}
                  value={district}
                  errors={errors}
                />
              </Col>

              <Col md={4}>
                <InputDefault
                  label={"Complemento"}
                  name={"complement"}
                  placeholder="Informe o complemento"
                  onChange={setComplement}
                  value={complement}
                  errors={errors}
                />
              </Col>

              <Col md={12}>
                <InputDefault
                  mask={"(99) 99999-9999"}
                  label={"Whatsapp"}
                  name={"whatsapp"}
                  required={true}
                  onChange={setWhatsapp}
                  value={whatsapp}
                  errors={errors}
                />
              </Col>

              <Col md={6}>
                <InputDefault
                  label={"Facebook"}
                  name={"facebook"}
                  placeholder="Informe a URL"
                  onChange={setFacebook}
                  value={facebook}
                  errors={errors}
                />
              </Col>

              <Col md={6}>
                <InputDefault
                  label={"Linkedin"}
                  name={"linkedin"}
                  placeholder="Informe a URL"
                  onChange={setLinkedin}
                  value={linkedin}
                  errors={errors}
                />
              </Col>

              <Col md={6}>
                <InputDefault
                  label={"Twitter"}
                  name={"twitter"}
                  placeholder="Informe a URL"
                  onChange={setTwitter}
                  value={twitter}
                  errors={errors}
                />
              </Col>

              <Col md={6}>
                <InputDefault
                  label={"Instagram"}
                  name={"instagram"}
                  placeholder="Informe a URL"
                  onChange={setInstagram}
                  value={instagram}
                  errors={errors}
                />
              </Col>

              <Col md={6}>
                <InputDefault
                  customClass="disable-paste"
                  label={"Senha"}
                  name={"password"}
                  type={"password"}
                  placeholder="Informe a senha"
                  required={true}
                  onChange={setPassword}
                  value={password}
                  errors={errors}
                  obs={"No m??nimo 8 caracteres"}
                />
              </Col>

              <Col md={6}>
                <InputDefault
                  customClass="disable-paste"
                  label={"Confirmar senha"}
                  name={"confirm"}
                  type={"password"}
                  placeholder="Confirme a senha"
                  required={true}
                  onChange={setConfirmPassword}
                  value={confirmPassword}
                  errors={errors}
                />
              </Col>

              <Col md={12}>
                <BtnDefault
                  testid="btn-register"
                  customClass={"mt-4"}
                  loading={loadingSave}
                  size={"lg"}
                  title={"Cadastrar"}
                  block={true}
                  onClick={Save}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}

export default Register;
