import React from "react";

import no_data from "assets/images/no_data.svg";

const MsgEmpty = ({ text }) => {
  return (
    <div className="mt-4 container-msg-empty">
      <img src={no_data} />
      <p className="text-center">{text}</p>
    </div>
  );
};

export default MsgEmpty;
