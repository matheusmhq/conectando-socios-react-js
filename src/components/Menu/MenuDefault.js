import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";

import DropdownUser from "./components/DropdownUser";
import logo from "assets/images/logo_white.png";

function MenuDefault({ history }) {
  const user = useSelector((state) => state.user);
  const pathname = window.location.pathname.toLocaleLowerCase();
  const [menuMain, setMenuMain] = useState(pathname);
  const [menuUser, setMenuUser] = useState("");

  function HandlerMenuMain(page) {
    setMenuUser("");
    setMenuMain(page);
    history.push(`${page}`);
  }

  return (
    <>
      <Navbar
        className="menu-default"
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand
            title={"Ir para a Home"}
            onClick={() => HandlerMenuMain("/")}
          >
            <img className="main-logo" src={logo} />
          </Navbar.Brand>
          {user?.data?.id != undefined ? (
            <DropdownUser customClass={"d-lg-none"} history={history} />
          ) : (
            <Button
              className="d-lg-none text-primary font-weight-bold"
              variant="light"
              onClick={() => history.push("/login")}
            >
              Entrar
            </Button>
          )}
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto nav-menu">
              <Nav.Link
                className={menuMain === "/" && "active"}
                onClick={() => HandlerMenuMain("/")}
              >
                Home
              </Nav.Link>
              <Nav.Link
                className={menuMain === "/how-work" && "active"}
                onClick={() => HandlerMenuMain("/how-work")}
              >
                Como Funciona
              </Nav.Link>
              <Nav.Link
                className={menuMain === "/publish-project" && "active"}
                onClick={() => HandlerMenuMain("/publish-project")}
              >
                Publicar Projeto
              </Nav.Link>
              <NavDropdown
                className={`${
                  menuMain.includes("/my-projects") && "active"
                } dropdown-projects`}
                title="Meus Projetos"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  className="item-projects"
                  onClick={() => HandlerMenuMain("/my-projects/published")}
                >
                  Publicados
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="item-projects"
                  onClick={() => HandlerMenuMain("/my-projects/saved")}
                >
                  Salvos
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          {user?.data?.id != undefined ? (
            <DropdownUser
              customClass={"d-none d-lg-block"}
              history={history}
              setMenuUser={setMenuUser}
              menuUser={menuUser}
              setMenuMain={setMenuMain}
            />
          ) : (
            <Button
              className="d-none d-lg-block text-primary font-weight-bold"
              variant="light"
              onClick={() => history.push("/login")}
            >
              Entrar
            </Button>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default MenuDefault;
