import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import { userLogoutDispatch } from "store/dispatchs/dispatchs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faCog } from "@fortawesome/free-solid-svg-icons";

import AvatarDefault from "components/Avatar/AvatarDefault";

const DropdownUser = ({ customClass, history }) => {
  const user = useSelector((state) => state.user);
  const [dropdownShow, setDropdownShow] = useState(false);

  useEffect(() => {
    setDropdownShow(false);
  }, [window.location.pathname]);

  const handleToggle = (e) => {
    setDropdownShow(e);
  };

  function Logout() {
    userLogoutDispatch();
    localStorage.clear();
    history.push({ pathname: "/" });
  }

  function RenderUserName() {
    if (user.data?.name !== undefined && user.data?.name !== null) {
      return user.data.name.split(" ")[0];
    }
  }

  return (
    <NavDropdown
      onToggle={handleToggle}
      show={dropdownShow}
      alignRight
      title={
        <div className="user" title={user.data?.name}>
          <p className="user-name d-none d-lg-block">{RenderUserName()}</p>
          {<AvatarDefault name={user.data?.name} />}
        </div>
      }
      className={`dropdown-user ${customClass}`}
    >
      <NavDropdown.Header>
        <strong>{user.data.name}</strong>
      </NavDropdown.Header>

      <NavLink
        to={"/user/profile"}
        className="nav-link nav-config"
        activeClassName={"active"}
      >
        <span className="dropdown-user-item">
          <FontAwesomeIcon icon={faCog} />
          <span>Configurações</span>
        </span>
      </NavLink>

      <Dropdown.Divider />

      <NavDropdown.Item onClick={() => Logout()}>
        <span className="dropdown-user-item">
          <FontAwesomeIcon icon={faSignInAlt} />
          <span>Sair</span>
        </span>
      </NavDropdown.Item>
    </NavDropdown>
  );
};

export default DropdownUser;
