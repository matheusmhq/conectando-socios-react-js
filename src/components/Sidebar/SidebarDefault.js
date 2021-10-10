import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";

import BtnDefault from "components/Form/Buttons/BtnDefault";
import DropdownDefault from "components/Form/Dropdowns/DropdownDefault";
import { getCity, getState, getTypes } from "functions/requests/requestGet";

function SidebarDefault({ history, ...props }) {
  const {
    idType,
    setIdType,
    idState,
    setIdState,
    idCity,
    setIdCity,
    setPage,
    reload,
    setReload,
  } = props;

  const [loading, setLoading] = useState(false);
  const [optionsState, setOptionsState] = useState([]);
  const [optionsCity, setOptionsCity] = useState([]);
  const [optionsTypes, setOptionsTypes] = useState([]);

  useEffect(() => {
    getState(setOptionsState);
    getTypes(setOptionsTypes);
  }, []);

  useEffect(() => {
    if (idState > 0) getCity(setOptionsCity, setLoading, idState);
    else {
      setOptionsCity([]);
      setIdCity(0);
    }
  }, [idState]);

  const ClearFields = () => {
    setIdType(0);
    setIdState(0);
    setIdCity(0);
    setPage(1);
    setReload(!reload);
  };

  const ApplyFilter = () => {
    setPage(1);
    setReload(!reload);
  };

  return (
    <div className="sidebar-filters w-100">
      <h4 className="title-default">Filtros</h4>

      <Col md={12}>
        <DropdownDefault
          label={"Categoria"}
          name={"type"}
          onChange={setIdType}
          value={idType}
          options={optionsTypes}
        />
      </Col>

      <Col md={12}>
        <DropdownDefault
          label={"Estado"}
          name={"state"}
          onChange={setIdState}
          value={idState}
          options={optionsState}
        />
      </Col>

      <Col md={12}>
        <DropdownDefault
          label={"Cidade"}
          name={"city"}
          onChange={setIdCity}
          value={idCity}
          options={optionsCity}
          customClass={"mb-0"}
        />
      </Col>

      <Col md={12} className="mt-3">
        <BtnDefault
          testid="btn-sign-in"
          size={"md"}
          title={"Aplicar"}
          block={true}
          onClick={ApplyFilter}
        />
      </Col>

      <Col md={12} className="mt-3">
        <BtnDefault
          testid="btn-sign-in"
          size={"md"}
          title={"Limpar"}
          block={true}
          variant={"outline-secondary"}
          onClick={ClearFields}
        />
      </Col>
    </div>
  );
}

export default SidebarDefault;
