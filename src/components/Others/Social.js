import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faFacebookSquare,
  faLinkedin,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { GenerateLinkWhatsapp } from "functions/utils";

const Social = ({
  whatsapp,
  facebook,
  linkedin,
  instagram,
  twitter,
  projectTitle,
}) => {
  function RenderTooltip(socialNetwork) {
    return <Tooltip id="tooltip-top">Entrar em contato pelo {socialNetwork}</Tooltip>;
  }

  return (
    <div className="container-social">
      {whatsapp && (
        <OverlayTrigger
          placement="top"
          delay={{ show: 10, hide: 10 }}
          overlay={RenderTooltip("Whatsapp")}
        >
          <a
            className="whatsapp"
            target="_blank"
            href={GenerateLinkWhatsapp(
              whatsapp,
              `Olá, tudo bem? Estou entrando em contato através da plataforma Conectando Sócios, fiquei interessado no seu projeto chamado "${projectTitle}", podemos conversar melhor?`
            )}
          >
            <FontAwesomeIcon icon={faWhatsapp} />
          </a>
        </OverlayTrigger>
      )}

      {facebook && (
        <OverlayTrigger
          placement="top"
          delay={{ show: 10, hide: 10 }}
          overlay={RenderTooltip("Facebook")}
        >
          <a target="_blank" href={facebook} className="facebook">
            <FontAwesomeIcon icon={faFacebookSquare} />
          </a>
        </OverlayTrigger>
      )}

      {linkedin && (
        <OverlayTrigger
          placement="top"
          delay={{ show: 10, hide: 10 }}
          overlay={RenderTooltip("Linkedin")}
        >
          <a target="_blank" href={linkedin} className="linkedin">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </OverlayTrigger>
      )}

      {instagram && (
        <OverlayTrigger
          placement="top"
          delay={{ show: 10, hide: 10 }}
          overlay={RenderTooltip("Instagram")}
        >
          <a target="_blank" href={instagram} className="instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </OverlayTrigger>
      )}

      {twitter && (
        <OverlayTrigger
          placement="top"
          delay={{ show: 10, hide: 10 }}
          overlay={RenderTooltip("Twitter")}
        >
          <a target="_blank" href={twitter} className="twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        </OverlayTrigger>
      )}
    </div>
  );
};

export default Social;
