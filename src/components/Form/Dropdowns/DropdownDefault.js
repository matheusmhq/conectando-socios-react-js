import React from "react";
import { Form } from "react-bootstrap";

const DropdownDefault = ({
  onChange,
  label,
  name,
  value,
  required,
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
        data-testid={name}
        required={required}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        as="select"
        style={customStyles}
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

      {obs && <p className="small mb-0">{obs}</p>}

      {errors?.includes(name) && (
        <p data-testid="text-required" className="text-danger small">
          Obrigatório
        </p>
      )}
    </Form.Group>
  );
};

export default DropdownDefault;
