import React from "react";
import { useSelector } from "react-redux";
import { Dropdown, NavDropdown } from "react-bootstrap";
import { userLogoutDispatch } from "store/dispatchs/dispatchs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faCog } from "@fortawesome/free-solid-svg-icons";

import AvatarDefault from "components/Avatar/AvatarDefault";

const DropdownUser = ({
  history,
  setMenuUser,
  menuUser,
  setMenuMain,
  customClass,
}) => {
  const user = useSelector((state) => state.user);
  console.log("user");
  console.log(user);

  function HandlerMenuUser(page) {
    setMenuUser(page);
    setMenuMain("");
    history.push(`${page}`);
  }

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

      <NavDropdown.Item
        onClick={() => HandlerMenuUser("/user/profile")}
        className={menuUser == "/user/profile" && "active"}
      >
        <span className="dropdown-user-item">
          <FontAwesomeIcon icon={faCog} />
          <span>Configuração</span>
        </span>
      </NavDropdown.Item>

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
