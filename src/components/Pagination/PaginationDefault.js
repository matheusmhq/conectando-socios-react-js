import React from "react";
import {
  Pagination,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

const PaginationDefault = ({
  setPage,
  page,
  setLimit,
  limit,
  totalResults,
  lastPage,
}) => {
  const BuildPages = () => {
    var pages = [];
    var last = lastPage > 1 ? lastPage : 1;
    for (let i = 1; i <= last; i++) {
      pages.push(
        <Pagination.Item onClick={() => setPage(i)} key={i} active={i == page}>
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  };

  const HandlerLimit = (qty) => {
    setPage(1);
    setLimit(qty);
  };

  return (
    <Row className="align-items-center mt-4 mt-md-5">
      <Col md={4}>
        <div className="container-info-results d-flex flex-column align-items-center align-items-md-start">
          <p className="mb-0 info-pages">Exibindo</p>
          <p className="mb-0 info-results">
            {limit > totalResults
              ? totalResults
              : page == lastPage
              ? totalResults
              : limit * page}{" "}
            de {totalResults} resultados
          </p>
        </div>
      </Col>

      <Col md={4} className="d-flex justify-content-center my-4 my-md-0">
        <Pagination className="mb-0">
          {page > 1 && (
            <Pagination.First
              title={"Voltar para primeira página"}
              onClick={() => setPage(1)}
            />
          )}
          {BuildPages()}
          {page < lastPage && (
            <Pagination.Last
              title={"Ir para última página"}
              onClick={() => setPage(lastPage)}
            />
          )}
        </Pagination>
      </Col>

      <Col
        md={4}
        className="d-flex justify-content-center  justify-content-md-end"
      >
        <DropdownButton
          title={`${limit} resultados`}
          className="btn-qty-results"
          // variant="secondary"
        >
          <Dropdown.Item onClick={() => HandlerLimit(10)}>
            10 resultados
          </Dropdown.Item>
          <Dropdown.Item onClick={() => HandlerLimit(15)}>
            15 resultados
          </Dropdown.Item>
          <Dropdown.Item onClick={() => HandlerLimit(20)}>
            20 resultados
          </Dropdown.Item>
        </DropdownButton>
      </Col>
    </Row>
  );
};

export default PaginationDefault;
