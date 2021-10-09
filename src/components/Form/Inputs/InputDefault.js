import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import InputMask from "react-input-mask";

const InputDefault = ({
  onChange,
  onBlur,
  value,
  label,
  name,
  placeholder,
  required,
  customClass,
  customStyles,
  customClassFormGroup,
  type,
  prependText,
  mask,
  plaintext,
  readOnly,
  obs,
  errors,
  onkeypress,
  maxLength,
}) => {
  var border = "";
  var form_c = "form-control";
  if (errors?.includes(name)) border = "border-danger";
  if (plaintext) form_c = "form-control-plaintext";

  return (
    <Form.Group className={customClassFormGroup}>
      <Form.Label>
        {label} {required && "*"}
      </Form.Label>

      <InputGroup>
        {prependText && (
          <InputGroup.Prepend>
            <InputGroup.Text>{prependText}</InputGroup.Text>
          </InputGroup.Prepend>
        )}

        {mask ? (
          <InputMask
            data-testid={name}
            maxLength={maxLength}
            onKeyPress={onkeypress}
            required={required}
            name={name}
            mask={mask}
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) => {
              if (onBlur !== undefined) onBlur();
            }}
            disabled={readOnly}
            value={value}
            className={`validation-here ${border} ${form_c} ${customClass}`}
            style={customStyles}
          />
        ) : (
          <input
            data-testid={name}
            maxLength={maxLength}
            onKeyPress={onkeypress}
            required={required}
            name={name}
            plaintext={plaintext}
            readOnly={readOnly}
            onChange={(e) => onChange(type != "file" ? e.target.value : e)}
            onBlur={(e) => {
              if (onBlur !== undefined) onBlur();
            }}
            value={value}
            type={type}
            placeholder={placeholder}
            className={`validation-here ${border} ${form_c} ${customClass}`}
            style={customStyles}
          />
        )}
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

export default InputDefault;
