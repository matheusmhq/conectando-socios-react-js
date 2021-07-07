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
import { update } from "./js/api";
import { usePrevious } from "functions/hooks";

function Profile({ history }) {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(user.data.name);
  const [email, setEmail] = useState(user.data.email);
  const [cep, setCep] = useState(user.data.cep);
  const [idState, setIdState] = useState(user.data.idState);
  const [idCity, setIdCity] = useState(user.data.idCity);
  const [address, setAddress] = useState(user.data.address);
  const [number, setNumber] = useState(user.data.number);
  const [district, setDisctric] = useState(user.data.district);
  const [complement, setComplement] = useState(user.data.complement);
  const [whatsapp, setWhatsapp] = useState(user.data.whatsapp);
  const [facebook, setFacebook] = useState(user.data.facebook);
  const [linkedin, setLinkedin] = useState(user.data.linkedin);
  const [twitter, setTwitter] = useState(user.data.twitter);
  const [instagram, setInstagram] = useState(user.data.instagram);
  const [loadingSave, setLoadingSave] = useState(false);
  const [errors, setErrors] = useState("");

  const [optionsState, setOptionsState] = useState([]);
  const [optionsCity, setOptionsCity] = useState([]);

  //Custom hooks
  const prevEmail = usePrevious(email);

  useEffect(() => {
    getCity(setOptionsCity, setLoading);
    getState(setOptionsState);
  }, []);

  const VerifyEmailLocal = () => {
    verifyEmail(email, setEmail, prevEmail);
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

  const Update = () => {
    update(
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
      user,
      setErrors,
      setLoadingSave
    );
  };

  if (loading) return <Loading />;
  else {
    return (
      <div style={{ borderRadius: 4 }} className="bg-white p-3">
        <Row>
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
              readOnly={true}
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

          <Col md={12}>
            <BtnDefault
              customClass={"mt-4"}
              loading={loadingSave}
              size={"lg"}
              title={"Salvar"}
              block={true}
              onclick={Update}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
