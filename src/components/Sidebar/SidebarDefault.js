import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";

import DropdownDefault from "components/Form/Dropdowns/DropdownDefault";
import { getCity, getState, getTypes } from "functions/requests/requestGet";

function SidebarDefault({ history, ...props }) {
  const { idType, setIdType, idState, setIdState, idCity, setIdCity, setPage } =
    props;

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

  const ChangeType = (type) => {
    setIdType(type);
    setPage(1);
  };

  const ChangeState = (state) => {
    setIdState(state);
    setPage(1);
  };

  const ChangeCity = (city) => {
    setIdCity(city);
    setPage(1);
  };

  return (
    <div className="sidebar-filters w-100">
      <h4 className="title-default">Filtros</h4>

      <Col md={12}>
        <DropdownDefault
          label={"Categoria"}
          name={"type"}
          onchange={ChangeType}
          value={idType}
          options={optionsTypes}
        />
      </Col>

      <Col md={12}>
        <DropdownDefault
          label={"Estado"}
          name={"state"}
          onchange={ChangeState}
          value={idState}
          options={optionsState}
        />
      </Col>

      <Col md={12}>
        <DropdownDefault
          label={"Cidade"}
          name={"city"}
          onchange={ChangeCity}
          value={idCity}
          options={optionsCity}
          customClass={"mb-0"}
        />
      </Col>
    </div>
  );
}

export default SidebarDefault;
