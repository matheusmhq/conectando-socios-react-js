import React from "react";
import { Form } from "react-bootstrap";

const DropdownDefault = ({
  onchange,
  label,
  name,
  value,
  required,
  disabled,
  customStyles,
  options,
  obs,
  errors,
  customClass,
}) => {
  var border = "";
  if (errors?.includes(name)) border = "border-danger";

  return (
    <Form.Group className={customClass}>
      <Form.Label>
        {label} {required && "*"}
      </Form.Label>
      <Form.Control
        required={required}
        name={name}
        value={value}
        onChange={(e) => onchange(e.target.value)}
        as="select"
        className={`validation-here ${border}`}
      >
        <option value={0}>Selecionar</option>
        {options &&
          options.map((item, index) => {
            return (
              <option key={index} value={item.id}>
                {item.name}
              </option>
            );
          })}
      </Form.Control>

      {obs && <p className="small">{obs}</p>}

      {errors?.includes(name) && (
        <p className="text-danger small">Obrigatório</p>
      )}
    </Form.Group>
  );
};

export default DropdownDefault;
