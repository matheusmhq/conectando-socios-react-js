import React from "react";
import { Button, Spinner } from "react-bootstrap";

const BtnDefault = ({
  onclick,
  title,
  disabled,
  customStyles,
  customClass,
  size,
  loading,
  loadingColor,
  variant,
  block,
  testid,
}) => {
  return (
    <Button
      data-testid={testid || ""}
      className={customClass}
      block={block}
      disabled={disabled}
      style={customStyles}
      variant={variant == undefined ? "primary" : variant}
      size={size}
      onClick={() => onclick()}
    >
      {!loading ? (
        title
      ) : (
        <Spinner
          animation="border"
          role="status"
          variant={loadingColor == undefined ? "light" : loadingColor}
          size="sm"
        />
      )}
    </Button>
  );
};

export default BtnDefault;
