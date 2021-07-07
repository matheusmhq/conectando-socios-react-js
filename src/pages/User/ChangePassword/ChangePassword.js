import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

import InputDefault from "components/Form/Inputs/InputDefault";
import BtnDefault from "components/Form/Buttons/BtnDefault";
import { DisablePaste } from "functions/utils";
import { update } from "./js/api";

function ChangePassword({ history }) {
  const user = useSelector((state) => state.user);
  const [loadingSave, setLoadingSave] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState("");

  useEffect(() => {
    DisablePaste();
  });

  const Update = () => {
    update(
      currentPassword,
      setCurrentPassword,
      newPassword,
      setNewPassword,
      confirmPassword,
      setConfirmPassword,
      user,
      setErrors,
      setLoadingSave
    );
  };

  return (
    <div style={{ borderRadius: 4 }} className="bg-white p-3">
      <Row>
        <Col md={12}>
          <InputDefault
            customClass="disable-paste"
            label={"Senha Atual"}
            name={"current"}
            type={"password"}
            placeholder="Informe a Senha Atual da conta"
            required={true}
            onchange={setCurrentPassword}
            value={currentPassword}
            errors={errors}
          />
        </Col>

        <Col md={12}>
          <InputDefault
            customClass="disable-paste"
            label={"Nova Senha"}
            name={"new"}
            type={"password"}
            placeholder="Informe a Nova Senha"
            required={true}
            onchange={setNewPassword}
            value={newPassword}
            errors={errors}
            obs={"No mínimo 8 caracteres"}
          />
        </Col>

        <Col md={12}>
          <InputDefault
            customClass="disable-paste"
            label={"Confirmar a nova "}
            name={"confirm"}
            type={"password"}
            placeholder="Confirme e Nova Senha"
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

export default ChangePassword;
