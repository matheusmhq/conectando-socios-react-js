import React, { useState, useEffect } from "react";
import { Modal, Row, Col } from "react-bootstrap";

import BtnDefault from "components/Form/Buttons/BtnDefault";

const ModalConfirmDelete = ({
  setShowModalConfirmDelete,
  showModalConfirmDelete,
  title,
  handler,
}) => {
  const CloseModal = () => {
    setShowModalConfirmDelete(false);
  };

  return (
    <Modal
      show={showModalConfirmDelete}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-edit-project"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Row className="w-100 d-flex justify-content-end">
          <Col xs={6}>
            <BtnDefault
              variant="outline-secondary"
              title={"Cancelar"}
              block={true}
              onclick={CloseModal}
            />
          </Col>

          <Col xs={6}>
            <BtnDefault title={"Continuar"} block={true} onclick={handler} />
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmDelete;
