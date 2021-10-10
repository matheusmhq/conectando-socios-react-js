import React from "react";
import { Button, Spinner } from "react-bootstrap";

const BtnDefault = ({
  onClick,
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
      variant={variant || "primary"}
      size={size}
      onClick={() => onClick()}
    >
      {!loading ? (
        title
      ) : (
        <Spinner
          animation="border"
          role="status"
          variant={loadingColor || "light"}
          size="sm"
        />
      )}
    </Button>
  );
};

export default BtnDefault;
