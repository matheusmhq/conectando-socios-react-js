import React, { useState, useEffect } from "react";
import { Container, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

import InputDefault from "components/Form/Inputs/InputDefault";
import BtnDefault from "components/Form/Buttons/BtnDefault";
import { signIn } from "./js/api";
import { EnterPressed, ValidateEmail } from "functions/utils";
import { alertDispatch } from "store/dispatchs/dispatchs";

function Login({ history }) {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);
  const [errors, setErrors] = useState("");

  useEffect(() => {
    if (user?.data?.id != undefined) history.push("/");
  }, []);

  const ValidateEmailLocal = () => {
    if (!ValidateEmail(email) && email != "") {
      setEmail("");
      alertDispatch("error", "E-mail inválido");
    }
  };

  const SignIn = () => {
    signIn(email, password, history, setErrors, setLoadingSave);
  };

  return (
    <div className="main-login d-flex justify-content-center align-items-center">
      <Container fluid>
        <div className="container-login shadow-default py-5 p-4 p-md-5">
          <h1 className="mb-4 mb-md-5">Faça seu login</h1>

          <Col md={12}>
            <InputDefault
              label={"E-mail"}
              name={"email"}
              placeholder="Informe o e-mail"
              required={true}
              onblur={ValidateEmailLocal}
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
              onkeypress={(e) => EnterPressed(e, SignIn)}
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
              size={"lg"}
              title={"Entrar"}
              block={true}
              onclick={SignIn}
            />
          </Col>
        </div>
      </Container>
    </div>
  );
}

export default Login;
