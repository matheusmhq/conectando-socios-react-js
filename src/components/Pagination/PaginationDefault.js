import React from "react";
import {
  Pagination,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

const listPerPage = [10, 15, 20];
const qtyOfPagesOnLeftOfCurrent = 1;
const qtyOfPagesOnRightOfCurrent = 3;

const PaginationDefault = ({
  setPage,
  page,
  setPerPage,
  perPage,
  totalResults,
  lastPage,
}) => {
  const BuildPages = () => {
    page = Number(page);
    lastPage = Number(lastPage);

    var pages = [];

    //Pages on left of current
    var first = page > 1 ? page - qtyOfPagesOnLeftOfCurrent : page;

    //Pages on right of current
    var last = lastPage > 1 ? page + qtyOfPagesOnRightOfCurrent : 1;
    if (last > lastPage) last = lastPage;

    for (let i = first; i <= last; i++) {
      pages.push(
        <Pagination.Item onClick={() => setPage(i)} key={i} active={i == page}>
          {i}
        </Pagination.Item>
      );
    }
    return pages;
  };

  const HandlerPerPage = (qty) => {
    setPage(1);
    setPerPage(qty);
  };

  return (
    <Row className="align-items-center mt-4">
      <Col md={4}>
        <div className="container-info-results d-flex flex-column align-items-center align-items-md-start">
          <p className="mb-0 info-pages">Exibindo</p>
          <p className="mb-0 info-results">
            {perPage > totalResults
              ? totalResults
              : page == lastPage
              ? totalResults
              : perPage * page}{" "}
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
        className="d-flex justify-content-center justify-content-md-end"
      >
        <DropdownButton
          title={`${perPage} resultados`}
          className="btn-qty-results"
        >
          {listPerPage.map((item, index) => {
            return (
              <Dropdown.Item key={index} onClick={() => HandlerPerPage(item)}>
                {item} resultados
              </Dropdown.Item>
            );
          })}
        </DropdownButton>
      </Col>
    </Row>
  );
};

export default PaginationDefault;
