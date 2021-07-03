import React from "react";
import Avatar from "react-avatar";

const AvatarDefault = ({ name, size, color, fgColor }) => {
  return (
    <Avatar
      color={color || "white"}
      fgColor={fgColor || "#007BFF"}
      maxInitials={2}
      round={true}
      size={size || 40}
      name={name}
      title={name}
    />
  );
};

export default AvatarDefault;
