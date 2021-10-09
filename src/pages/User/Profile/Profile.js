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
} from "functions/requests/requestGet";
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
      <div style={{ borderRadius: 4 }} className="bg-white p-4">
        <Row>
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
              readOnly={true}
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
              label={"Número"}
              name={"number"}
              placeholder="Informe o número"
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

          <Col md={12}>
            <BtnDefault
              customClass={"mt-4"}
              loading={loadingSave}
              size={"lg"}
              title={"Salvar"}
              block={true}
              onClick={Update}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Profile;
