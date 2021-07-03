import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Loading from "components/Loading/Loading";
import SidebarDefault from "components/Sidebar/SidebarDefault";
import CardProject from "components/Cards/CardProject";
import { getProjects } from "./js/api";
import { useDebounce } from "functions/hooks";
import { UrlParams, SetParamsUrl } from "functions/utils";
import MsgEmpty from "components/Others/MsgEmpty";

function Home({ history }) {
  const user = useSelector((state) => state.user);

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
  }, [user, idType, idState, idCity]);

  const GetProjects = () => {
    var obj = {
      path: "/",
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
      setLoading
    );
  };

  if (loading) return <Loading />;
  else {
    return (
      <Container className="container-100 my-5">
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
            <div className="form-control mb-3 d-flex mt-4 mt-md-0">
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
    );
  }
}

export default Home;
