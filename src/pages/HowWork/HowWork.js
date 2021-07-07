import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileWink, faFilePdf } from "@fortawesome/free-solid-svg-icons";

import user_documentation from "assets/docs/user_documentation.pdf";
import networking from "assets/images/networking.svg";
import logo from "assets/images/logo.png";

function HowWork() {
  return (
    <Container fluid className="my-4 my-md-5">
      <div className="bg-white p-4 how-work">
        <Row className="container-how-work">
          <Col md={10}>
            <div className="d-flex mb-4 flex-wrap justify-content-center justify-content-md-start">
              <h3 className="text-center">Como funciona o</h3>
              <img
                title="Conectando Sócios"
                alt="Conectanddo Sócios"
                style={{ width: 100 }}
                className="img-fluid ml-3"
                src={logo}
              />
            </div>
            <p className="font-weight-bold mb-4">
              Nosso principal intuito é descomplicar a vida do empreendedor que
              esteja no inicio da sua jornada e procura alguém de confiança.
            </p>
            <p>
              Crie uma conta rapidamente com os links das suas redes sociais.
            </p>
            <p>
              Publique um projeto e aguarde os interessados entrarem em contato.
            </p>
            <p className="text-smile">
              Viu? É rápido, fácil e prático{" "}
              <FontAwesomeIcon color={"#007bff"} icon={faSmileWink} />
            </p>
          </Col>

          <Col md={2} className="d-none d-md-flex">
            <img className="img-fluid" src={networking} />
          </Col>
        </Row>

        <div className="container-user-doc d-flex mt-4 flex-wrap">
          <p className="mb-0 mr-2">Para acessar a Documentação Do Usuário</p>
          <a
            className="text-center text-md-left"
            title="Abrir pdf da Documentação Do Usuário"
            onClick={() => window.open(user_documentation)}
          >
            CLIQUE AQUI <FontAwesomeIcon color={"#007bff"} icon={faFilePdf} />
          </a>
        </div>
      </div>
    </Container>
  );
}

export default HowWork;
