import React, { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";

import InputDefault from "components/Form/Inputs/InputDefault";
import BtnDefault from "components/Form/Buttons/BtnDefault";
import { logar } from "./js/api";
import logo from "assets/images/logo.png";
import { isAuthenticated } from "functions/utils";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (isAuthenticated()) history.push("/");
  }, []);

  const Logar = () => {
    logar(email, password, setErrors, setLoadingSave);
  };

  return (
    <div className="main-login d-flex justify-content-center align-items-center">
      <Container>
        <div className="container-login">
          <img src={logo} />
          <h1 className="my-5">Faça seu login</h1>

          <Col md={12}>
            <InputDefault
              label={"E-mail"}
              name={"email"}
              placeholder="Informe o e-mail"
              required={true}
              onchange={setEmail}
              value={email}
              errors={errors}
            />
          </Col>

          <Col md={12}>
            <InputDefault
              label={"Senha"}
              name={"password"}
              placeholder="Informe a senha"
              required={true}
              type="password"
              onchange={setPassword}
              value={password}
              errors={errors}
            />
          </Col>

          <a
            onClick={() => history.push("/register")}
            className="my-4 d-block btn-register"
          >
            Não tem conta?
          </a>

          <Col md={12}>
            <BtnDefault
              loading={loadingSave}
              md={12}
              size={"lg"}
              title={"Entrar"}
              block={true}
              onclick={Logar}
            />
          </Col>
        </div>
      </Container>
    </div>
  );
}

export default Login;
