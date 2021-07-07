import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import image_error from "assets/images/404.png";

function NotFound({ history }) {
  return (
    <div className="main-not-found">
      <Container>
        <div className="container-not-found">
          <Col md={6}>
            <img className="img-fluid" src={image_error} />
          </Col>

          <Col md={6}>
            <div className="h-100 d-flex flex-column justify-content-center align-content-center">
              <div className="warning">
                <h1>Página não encontrada</h1>
                <p>Essa página não existe</p>
              </div>

              <Button
                onClick={() => history.push("/")}
                variant="primary"
                block={true}
                className="font-weight-bold"
              >
                Voltar
              </Button>
            </div>
          </Col>
        </div>
      </Container>
    </div>
  );
}

export default NotFound;
