import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

function BtnBackToTop() {
  const [showBtn, setShowBtn] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 70) setShowBtn(true);
    else setShowBtn(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const Back = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  if (showBtn) {
    return (
      <button
        title="Voltar ao topo"
        onClick={() => Back()}
        className="btn-back-to-top btn-empty"
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    );
  } else {
    return null;
  }
}

export default BtnBackToTop;
