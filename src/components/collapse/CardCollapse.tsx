import { Collapse, Typography } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import colarrow from "../../assets/colarrow.svg";
import colarrowdown from "../../assets/colarrowdown.svg";
import React from "react";
import PropTypes from "prop-types";

import styles from "./CardCollapse.module.scss";

import messages from "../../constants/messages";

const { Panel } = Collapse;
const { Paragraph } = Typography;
interface CardCollapseProps {
  question: any;
  answer: any;
  index: number;
}
const CardCollapse: React.FC<CardCollapseProps> = ({
  question,
  answer,
  index,
}) => {
  return (
    <Collapse
      className={styles.card}
      accordion
      key={index}
      expandIcon={({ isActive }) =>
        isActive ? <img src={colarrow} /> : <img src={colarrowdown} />
      }
      // expandIcon={({ isActive }) => (
      //   <CaretRightOutlined rotate={isActive ? 90 : 0} />
      // )}
      defaultActiveKey={["1"]}
      ghost
    >
      <Panel header={question} key={index + 1} className={styles.panel}>
        <Paragraph className={styles.answer}>{answer}</Paragraph>
      </Panel>
    </Collapse>
  );
};

export default React.memo(CardCollapse);
