import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import InputDefault from "components/Form/Inputs/InputDefault";
import DropdownDefault from "components/Form/Dropdowns/DropdownDefault";
import BtnDefault from "components/Form/Buttons/BtnDefault";
import Loading from "components/Loading/Loading";
import {
  getAddress,
  getCity,
  getState,
  verifyEmail,
} from "functions/requests/request_get";
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
        <Container>
          <div className="container-login" style={{ maxWidth: 1144 }}>
            <h1 className="mb-5">Faça seu cadastro</h1>

            <Row className="w-100">
              <Col md={6}>
                <InputDefault
                  label={"Nome Completo"}
                  name={"name"}
                  placeholder="Informe o nome completo"
                  required={true}
                  onchange={setName}
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
                  onchange={setEmail}
                  value={email}
                  onblur={VerifyEmailLocal}
                  errors={errors}
                />
              </Col>

              <Col md={4}>
                <InputDefault
                  mask={"99999-999"}
                  label={"Cep"}
                  name={"cep"}
                  required={true}
                  onchange={setCep}
                  value={cep}
                  onblur={LoadAddress}
                  errors={errors}
                />
              </Col>

              <Col md={4}>
                <DropdownDefault
                  label="UF"
                  name={"uf"}
                  required={true}
                  options={optionsState}
                  onchange={setIdState}
                  value={idState}
                  errors={errors}
                />
              </Col>

              <Col md={4}>
                <DropdownDefault
                  label="Cidade"
                  name={"cidade"}
                  required={true}
                  options={optionsCity}
                  onchange={setIdCity}
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
                  onchange={setAddress}
                  value={address}
                  errors={errors}
                />
              </Col>

              <Col md={4}>
                <InputDefault
                  label={"Número"}
                  name={"number"}
                  placeholder="Informe o número"
                  required={true}
                  onchange={setNumber}
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
                  onchange={setDisctric}
                  value={district}
                  errors={errors}
                />
              </Col>

              <Col md={4}>
                <InputDefault
                  label={"Complemento"}
                  name={"complement"}
                  placeholder="Informe o complemento"
                  onchange={setComplement}
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
                  onchange={setWhatsapp}
                  value={whatsapp}
                  errors={errors}
                />
              </Col>

              <Col md={6}>
                <InputDefault
                  label={"Facebook"}
                  name={"facebook"}
                  placeholder="Informe a URL"
                  onchange={setFacebook}
                  value={facebook}
                  errors={errors}
                />
              </Col>

              <Col md={6}>
                <InputDefault
                  label={"Linkedin"}
                  name={"linkedin"}
                  placeholder="Informe a URL"
                  onchange={setLinkedin}
                  value={linkedin}
                  errors={errors}
                />
              </Col>

              <Col md={6}>
                <InputDefault
                  label={"Twitter"}
                  name={"twitter"}
                  placeholder="Informe a URL"
                  onchange={setTwitter}
                  value={twitter}
                  errors={errors}
                />
              </Col>

              <Col md={6}>
                <InputDefault
                  label={"Instagram"}
                  name={"instagram"}
                  placeholder="Informe a URL"
                  onchange={setInstagram}
                  value={instagram}
                  errors={errors}
                />
              </Col>

              <Col md={6}>
                <InputDefault
                  label={"Senha"}
                  name={"password"}
                  type={"password"}
                  placeholder="Informe a senha"
                  required={true}
                  onchange={setPassword}
                  value={password}
                  errors={errors}
                  obs={"No mínimo 8 caracteres"}
                />
              </Col>

              <Col md={6}>
                <InputDefault
                  label={"Confirmar senha"}
                  name={"confirm"}
                  type={"password"}
                  placeholder="Confirme a senha"
                  required={true}
                  onchange={setConfirmPassword}
                  value={confirmPassword}
                  errors={errors}
                />
              </Col>

              <Col md={12}>
                <BtnDefault
                  customClass={"mt-4"}
                  loading={loadingSave}
                  md={12}
                  size={"lg"}
                  title={"Cadastrar"}
                  block={true}
                  onclick={Save}
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
