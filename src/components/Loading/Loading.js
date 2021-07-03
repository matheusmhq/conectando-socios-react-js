import React from "react";
import { Spinner } from "react-bootstrap";

import "./styles.css";

const Loading = ({ customStyles, customClass, variant }) => {
  return (
    <div
      className={`loading-main d-flex justify-content-center align-items-center ${customClass}`}
    >
      <Spinner
        animation="border"
        role="status"
        variant={variant || "primary"}
        size="lg"
      />
    </div>
  );
};

export default Loading;
