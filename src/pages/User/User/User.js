import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router";

import SidebarConfig from "components/Sidebar/SidebarConfig";
import Profile from "../Profile/Profile";
import ChangePassword from "../ChangePassword/ChangePassword";

var sidebar = {
  title: "Configuração",
  options: [
    {
      path: "profile",
      name: "Perfil",
    },
    {
      path: "change-password",
      name: "Alterar Senha",
    },
  ],
};

function User({ history }) {
  let { tab } = useParams();
  const tabLower = tab?.toLowerCase();

  const RenderContent = () => {
    if (tabLower == "profile") return <Profile history={history} />;
    if (tabLower == "change-password")
      return <ChangePassword history={history} />;
  };

  return (
    <Container fluid className="full-height my-5">
      <Row>
        <Col md={3}>
          <SidebarConfig history={history} sidebar={sidebar} tab={tabLower} />
        </Col>

        <Col md={9} className="mt-4 mt-md-0">
          {RenderContent()}
        </Col>
      </Row>
    </Container>
  );
}

export default User;
