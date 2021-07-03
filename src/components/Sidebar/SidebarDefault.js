import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";

import DropdownDefault from "components/Form/Dropdowns/DropdownDefault";
import { getCity, getState, getTypes } from "functions/requests/request_get";

function SidebarDefault({ history, ...props }) {
  const { idType, setIdType, idState, setIdState, idCity, setIdCity } = props;

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

  return (
    <div className="sidebar-filters w-100">
      <h4 className="title-default">Filtros</h4>

      <Col md={12}>
        <DropdownDefault
          label={"Categoria"}
          name={"type"}
          onchange={setIdType}
          value={idType}
          options={optionsTypes}
        />
      </Col>

      <Col md={12}>
        <DropdownDefault
          label={"Estado"}
          name={"state"}
          onchange={setIdState}
          value={idState}
          options={optionsState}
        />
      </Col>

      <Col md={12}>
        <DropdownDefault
          label={"Cidade"}
          name={"city"}
          onchange={setIdCity}
          value={idCity}
          options={optionsCity}
        />
      </Col>
    </div>
  );
}

export default SidebarDefault;
