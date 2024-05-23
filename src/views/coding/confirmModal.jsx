import React from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";

export class ConfirmModel {
  constructor(data) {
    let context = data;
    if (!data) context = {};
    this.onClose = context.onClose;
    this.text = context.text;
    this.isOpen = context.isOpen;
    this.title = context.title;
    this.showCancel = context.showCancel;
    this.positiveBtnText = context.positiveBtnText;
    this.negetiveBtnText = context.negetiveBtnText;
    this.escapeToClose = context.escapeToClose;
    this.clickOutsideToClose = context.clickOutsideToClose;
    this.hideHeader = context.hideHeader;
    this.centered = context.centered;
  }
}

export default function ConfirmModal({ config }) {
  const {
    onClose,
    text,
    isOpen,
    title,
    showCancel,
    positiveBtnText,
    negetiveBtnText,
    escapeToClose,
    clickOutsideToClose,
    hideHeader,
    centered,
  } = config;
  const handleClose = (value) => {
    onClose(value);
  };

  return (
    <Modal
      backdrop={clickOutsideToClose ? true : "static"}
      keyboard={escapeToClose}
      isOpen={isOpen}
      toggle={() => handleClose(false)}
      centered={!!centered}
      size="lg"
    >
      {!hideHeader && (
        <div className="modal-header">
          <h5 className="modal-title">{title || ""}</h5>
          {showCancel && (
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => handleClose(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          )}
        </div>
      )}
      <ModalBody>{text}</ModalBody>
      <ModalFooter>
        {showCancel && (
          <button
            type="button"
            onClick={() => handleClose(false)}
            className="btn btn-outline-danger"
          >
            {negetiveBtnText || "CANCEL"}
          </button>
        )}
        <button
          type="button"
          onClick={() => handleClose(true)}
          className="btn btn-primary"
        >
          {positiveBtnText || "OK"}
        </button>
      </ModalFooter>
    </Modal>
  );
}
