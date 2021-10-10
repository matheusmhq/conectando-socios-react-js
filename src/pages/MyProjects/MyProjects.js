import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Loading from "components/Loading/Loading";
import SidebarDefault from "components/Sidebar/SidebarDefault";
import CardProject from "components/Cards/CardProject";
import { getProjects } from "./js/api";
import { useDebounce } from "functions/hooks";
import { SetParamsUrl, GetUrlParameter } from "functions/utils";
import MsgEmpty from "components/Others/MsgEmpty";
import PaginationDefault from "components/Pagination/PaginationDefault";

function MyProjects({ history }) {
  const user = useSelector((state) => state.user);
  const { tab } = useParams();

  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [listProjects, setListProjects] = useState([]);
  const [page, setPage] = useState(GetUrlParameter("page", 1));
  const [perPage, setPerPage] = useState(GetUrlParameter("perPage", 10));
  const [query, setQuery] = useState(GetUrlParameter("query", ""));
  const [idType, setIdType] = useState(GetUrlParameter("idType", 0));
  const [idState, setIdState] = useState(GetUrlParameter("idState", 0));
  const [idCity, setIdCity] = useState(GetUrlParameter("idCity", 0));

  const [totalResults, setTotalResults] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  useDebounce(
    () => {
      if (!loading) GetProjects();
    },
    [query],
    700
  );

  useEffect(() => {
    GetProjects();
  }, [page, perPage, user, tab, reload]);

  const GetProjects = () => {
    var obj = {
      path: `/my-projects/${tab}`,
      params: [
        {
          name: "page",
          value: page,
        },
        {
          name: "perPage",
          value: perPage,
        },
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
      tab,
      setListProjects,
      page,
      perPage,
      setTotalResults,
      setLastPage,
      query,
      idType,
      user?.data?.id,
      idState,
      idCity,
      setLoading
    );
  };

  function ClearFilters() {
    setIdType(0);
    setIdState(0);
    setIdCity(0);
    setQuery("");
    setPage(1);
  }

  if (loading) return <Loading customClass="mt-4" />;
  else {
    return (
      <>
        <Container fluid className="my-4 my-md-5 full-height">
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
                setPage={setPage}
                reload={reload}
                setReload={setReload}
              />
            </Col>

            <Col md={9}>
              <Nav
                fill
                variant="tabs"
                className="my-projects-tabs mt-3 mt-md-0"
              >
                <Nav.Item>
                  <Nav.Link
                    disabled={tab == "published"}
                    active={tab == "published"}
                    onClick={() => {
                      ClearFilters();
                      history.push(`/my-projects/published`);
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
                      ClearFilters();
                      history.push(`/my-projects/saved`);
                    }}
                  >
                    Projetos Salvos
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <div className="form-control d-flex mb-3 mt-3 mt-md-3">
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
                      updatedAt={item.updatedAt}
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
              {listProjects.length > 0 && (
                <PaginationDefault
                  setPage={setPage}
                  page={page}
                  setPerPage={setPerPage}
                  perPage={perPage}
                  totalResults={totalResults}
                  lastPage={lastPage}
                />
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default MyProjects;
