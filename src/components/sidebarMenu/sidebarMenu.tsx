import React, { useEffect, useState } from "react";
import { Button } from "antd";
import clsx from "clsx";
import hljs from "highlight.js";
import { useNavigate } from "react-router-dom";

import "highlight.js/styles/atom-one-dark.css";
import style from "./sidebarMenu.module.scss";

import leftArrow from "../../assets/Images/leftArrow.svg";
import rightArrow from "../../assets/Images/rightArrow.svg";

import menubar from "../../assets/Images/menubar@2x.svg";

import messages from "../../constants/messages";
import constants from "../../constants/constants";

import { MenuUnfoldOutlined } from "@ant-design/icons";

const {
  ROUTE: { SWITCH_PATH },
} = constants;

const { ICON } = messages;

const SidebarMenu = () => {
  const [close, setclose] = useState(false);

  return (
    <div className={style.firstColumn}>
      <Button className={style.menuBar}>
        <img src={menubar} alt={"ICON"} />
      </Button>
    </div>
  );
};

export default React.memo(SidebarMenu);
