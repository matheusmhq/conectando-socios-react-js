import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const TextareaDefault = ({
  onChange,
  onBlur,
  value,
  label,
  name,
  placeholder,
  required,
  customStyles,
  type,
  prependText,
  plaintext,
  readOnly,
  obs,
  errors,
  rows,
  cols,
}) => {
  var border = "";
  var form_c = "form-control";
  if (errors?.includes(name)) border = "border-danger";
  if (plaintext) form_c = "form-control-plaintext";

  return (
    <Form.Group className="form-group">
      <Form.Label>
        {label} {required && "*"}
      </Form.Label>

      <InputGroup>
        {prependText && (
          <InputGroup.Prepend>
            <InputGroup.Text>{prependText}</InputGroup.Text>
          </InputGroup.Prepend>
        )}

        <textarea
          required={required}
          name={name}
          rows={rows}
          cols={cols}
          plaintext={plaintext}
          readOnly={readOnly}
          style={customStyles}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => {
            if (onBlur !== undefined) onBlur();
          }}
          value={value}
          type={type}
          placeholder={placeholder}
          className={`validation-here ${border} ${form_c}`}
        />
      </InputGroup>

      {obs && <p className="small mb-0">{obs}</p>}

      {errors?.includes(name) && (
        <p data-testid="text-required" className="text-danger small">
          Obrigatório
        </p>
      )}
    </Form.Group>
  );
};

export default TextareaDefault;
