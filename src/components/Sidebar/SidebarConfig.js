import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";

const SidebarConfig = ({ history, sidebar, tab }) => {
  return (
    <div className="sidebar-config w-100">
      <h4 className="title-default">{sidebar.title}</h4>

      <div className="sidebar-config-menu">
        {sidebar.options.map((item, index) => {
          return (
            <button
              onClick={() => history.push(`/user/${item.path}`)}
              key={index}
              className={`btn-empty d-flex align-items-center ${
                tab == item.path && "sidebar-config-active"
              } ${sidebar.options.length - 1 == index && "mb-0"}`}
            >
              <FontAwesomeIcon
                icon={item.path == "profile" ? faUser : faKey}
                className="mr-2"
              />
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarConfig;
