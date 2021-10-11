import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import DropdownUser from "./components/DropdownUser";
import logo from "assets/images/logo_white.png";

function MenuDefault({ history }) {
  const user = useSelector((state) => state.user);
  const pathname = window.location.pathname.toLocaleLowerCase();
  const [dropdownShow, setDropdownShow] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setDropdownShow(false);
    setExpanded(false);
  }, [window.location.pathname]);

  const handleToggle = (e) => {
    setDropdownShow(e);
  };

  return (
    <>
      <Navbar
        expanded={expanded}
        className="menu-default"
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand
            className="mr-0 mr-md-2"
            title={"Ir para a Home"}
            onClick={() => history.push(`/`)}
          >
            <img className="main-logo" src={logo} />
          </Navbar.Brand>

          <div className="d-flex">
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
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="ml-3"
              onClick={() => setExpanded(!expanded)}
            />
          </div>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto nav-menu">
              <NavLink
                className="nav-link"
                to={"/"}
                exact={true}
                activeClassName="active"
              >
                Home
              </NavLink>
              <NavLink
                className="nav-link"
                to={"/how-work"}
                activeClassName="active"
              >
                Como Funciona
              </NavLink>
              <NavLink
                className="nav-link"
                to={"/publish-project"}
                activeClassName="active"
              >
                Publicar Projeto
              </NavLink>
              <NavDropdown
                onToggle={handleToggle}
                show={dropdownShow}
                className={`${
                  pathname.includes("/my-projects") && "active"
                } dropdown-projects`}
                title="Meus Projetos"
                id="collasible-nav-dropdown"
              >
                <NavLink
                  className="item-projects dropdown-item"
                  to={"/my-projects/published"}
                >
                  Publicados
                </NavLink>
                <NavLink
                  className="item-projects dropdown-item"
                  to={"/my-projects/saved"}
                >
                  Salvos
                </NavLink>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          {user?.data?.id != undefined ? (
            <DropdownUser customClass={"d-none d-lg-block"} history={history} />
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
