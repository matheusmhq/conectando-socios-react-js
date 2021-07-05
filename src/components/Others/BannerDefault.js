import React from "react";

import bg_networking from "assets/images/bg_networking.jpg";

const BannerDefault = () => {
  return (
    <div className="container-banner">
      <div className="banner-layer">
        <div className="container-banner-text">
          <h1 className="banner-title">CONECTANDO SÓCIOS</h1>
          <p className="banner-subtitle">
            Te ajudamos a encontrar o melhor sócio
          </p>
        </div>
        <img className="banner-main img-fluid" src={bg_networking} />
      </div>
    </div>
  );
};

export default BannerDefault;
