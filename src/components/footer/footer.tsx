import React from "react";
import { Typography } from "antd";
import styles from "./footer.module.scss";

import messages from "../../constants/messages";

const { Paragraph } = Typography;

const { DO_SELECT_RESEVE_RIGHTS } = messages;

const Footer = () => {
  let day = new Date().getFullYear();

  return (
    <footer className={styles.footercl} title={DO_SELECT_RESEVE_RIGHTS}>
      <Paragraph className={styles.footer_text}>
        &copy; {`${day} ${DO_SELECT_RESEVE_RIGHTS}`}
      </Paragraph>
    </footer>
  );
};

export default Footer;
