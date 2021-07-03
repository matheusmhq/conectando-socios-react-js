import React from "react";
import moment from "moment";

function FooterDefault() {
  return (
    <footer>
      <p className="mb-0">
        © {moment().format("YYYY")} Conectando Sócios - Todos os direitos
        reservados
      </p>
    </footer>
  );
}

export default FooterDefault;
