import React from "react";
import { Modal, Divider } from "antd";
import Icon from "@ant-design/icons";

import styles from "./modal.module.scss";

import { ReactComponent as closeIcon } from "../../assets/Xicon.svg";

import ButtonGrp from "../buttonGrp/buttonGrp";
import FormatData from "../markedData/markedData";
import clsx from "clsx";

export interface ModalProps {
  modalData: any;
  visible: boolean;
  Content?: any;
  showContent?: boolean;
  contentType?: boolean;
  width?: number;
  modalHead?: Boolean;
}
const BreezeModal: React.FC<ModalProps> = ({
  modalData,
  modalHead,
  visible,
  Content,
  showContent,
  contentType,
  width,
}) => {
  const { onOk, onCancel, buttons, text } = modalData;
  // console.log(visible, "Modal");
  return (
    <Modal
      data-testid="modal-client-id"
      className={styles.modal_class}
      centered
      width={width}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      footer={null}
      closable={false}
    >
      <div className={styles.modal_wrapper}>
        <div className={clsx({ [styles.modal_head]: modalHead })}></div>
        <div className={styles.xicon}>
          {contentType ? (
            <Icon
              data-testid="closeIcon"
              component={closeIcon}
              onClick={onCancel}
            />
          ) : (
            ""
          )}
        </div>
        {showContent ? (
          Content
        ) : (
          <FormatData
            data-testid="modaltestid"
            className={styles.modalContent}
            formatData={text}
          />
        )}

        <Divider className={styles.divider} />
        <ButtonGrp className={styles.modal_btn_div} buttons={buttons} />
      </div>
    </Modal>
  );
};

export default React.memo(BreezeModal);
