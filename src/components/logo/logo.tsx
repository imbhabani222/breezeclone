import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Icon from "@ant-design/icons";
import { ReactComponent as logo } from "../../assets/logo.svg";

import styles from "./logo.module.scss";
import constants from "../../constants/constants";
import messages from "../../constants/messages";
const { LOGO } = messages;
const {
  ROUTE: { LANDING_PAGE },
} = constants;
const Logo = () => {
  let location = useLocation();
  const slug = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const goToHome = useCallback(() => {
    navigate(LANDING_PAGE.replace(":slug", slug));
  }, [navigate, slug]);
  return (
    <Icon
      component={logo}
      title={LOGO}
      className={styles.logo}
      onClick={goToHome}
    />
  );
};
export default Logo;
