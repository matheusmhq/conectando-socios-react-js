import React from "react";
import Avatar from "react-avatar";

const AvatarDefault = ({ name }) => {
  return (
    <Avatar
      color={"white"}
      fgColor={"#007BFF"}
      maxInitials={2}
      round={true}
      size="50"
      name={name}
      title={name}
    />
  );
};

export default AvatarDefault;
