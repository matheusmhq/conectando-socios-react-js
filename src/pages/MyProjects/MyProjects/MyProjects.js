import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Button, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Loading from "components/Loading/Loading";
import SidebarDefault from "components/Sidebar/SidebarDefault";
import CardProject from "components/Cards/CardProject";
import { getProjects } from "../js/api";
import { useDebounce } from "functions/hooks";
import { UrlParams, SetParamsUrl } from "functions/utils";
import MsgEmpty from "components/Others/MsgEmpty";

function MyProjects({ history }) {
  const user = useSelector((state) => state.user);
  const { tab } = useParams();

  const [loading, setLoading] = useState(true);
  const [listProjects, setListProjects] = useState([]);
  const [query, setQuery] = useState(UrlParams().get("query") || "");
  const [idType, setIdType] = useState(
    parseInt(UrlParams().get("idType")) || 0
  );
  const [idState, setIdState] = useState(
    parseInt(UrlParams().get("idState")) || 0
  );
  const [idCity, setIdCity] = useState(
    parseInt(UrlParams().get("idCity")) || 0
  );

  useDebounce(
    () => {
      if (!loading) GetProjects();
    },
    [query],
    700
  );

  useEffect(() => {
    GetProjects();
  }, [user, idType, idState, idCity, tab]);

  const GetProjects = () => {
    var obj = {
      path: `/my_projects/${tab}`,
      params: [
        {
          name: "query",
          value: query,
        },
        {
          name: "idType",
          value: idType,
        },
        {
          name: "idState",
          value: idState,
        },
        {
          name: "idCity",
          value: idCity,
        },
      ],
    };
    SetParamsUrl(history, obj);

    getProjects(
      setListProjects,
      query,
      idType,
      user?.data?.id,
      idState,
      idCity,
      tab,
      setLoading
    );
  };

  function ClearFilters() {
    setIdType(0);
    setIdState(0);
    setIdCity(0);
    setQuery("");
  }

  if (loading) return <Loading customClass="mt-4" />;
  else {
    return (
      <>
        <Container fluid className="my-5 full-height">
          <Row>
            <Col md={3}>
              <SidebarDefault
                history={history}
                idType={idType}
                setIdType={setIdType}
                idState={idState}
                setIdState={setIdState}
                idCity={idCity}
                setIdCity={setIdCity}
              />
            </Col>

            <Col md={9}>
              <Nav
                fill
                variant="tabs"
                className="my-projects-tabs mt-4 mt-md-0"
              >
                <Nav.Item>
                  <Nav.Link
                    disabled={tab == "published"}
                    active={tab == "published"}
                    onClick={() => {
                      history.push(`/my_projects/published`);
                      ClearFilters();
                    }}
                  >
                    Projetos Publicados
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    disabled={tab == "saved"}
                    active={tab == "saved"}
                    onClick={() => {
                      history.push(`/my_projects/saved`);
                      ClearFilters();
                    }}
                  >
                    Projetos Salvos
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <div className="form-control mb-3 d-flex">
                <input
                  className="w-100 input-search"
                  placeholder="Pesquisar"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                />
                <div>
                  <FontAwesomeIcon icon={faSearch} />
                </div>
              </div>

              {listProjects.length == 0 ? (
                <MsgEmpty text={"Nenhum resultado encontrado"} />
              ) : (
                listProjects.map((item, index) => {
                  return (
                    <CardProject
                      key={index}
                      history={history}
                      id={item.id}
                      name={item.name}
                      idUser={item.idUser}
                      title={item.title}
                      description={item.description}
                      createdAt={item.createdAt}
                      idType={item.idType}
                      typeName={item.typeName}
                      cityName={item.cityName}
                      uf={item.uf}
                      projectSaveId={item?.projectSaveId}
                      listProjects={listProjects}
                      setListProjects={setListProjects}
                    />
                  );
                })
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default MyProjects;
