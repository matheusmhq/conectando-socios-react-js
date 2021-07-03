import React from "react";
import { Form, InputGroup } from "react-bootstrap";

const InputDefault = ({
  onchange,
  onblur,
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
          onChange={(v) => onchange(v.target.value)}
          onBlur={(v) => {
            if (onblur !== undefined) onblur();
          }}
          value={value}
          type={type}
          placeholder={placeholder}
          className={`validation-here ${border} ${form_c}`}
        />
      </InputGroup>

      {obs && <p className="small">{obs}</p>}

      {errors?.includes(name) && (
        <p className="text-danger small">Obrigatório</p>
      )}
    </Form.Group>
  );
};

export default InputDefault;
