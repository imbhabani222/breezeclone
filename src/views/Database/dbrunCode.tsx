import { Tabs, Button, Input, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import arrowdown from "../../assets/whitedropdown.svg";

import checkmark from "../../assets/checkmark.svg";

import { Menu, Dropdown, Space } from "antd";

import "react-quill/dist/quill.snow.css";
import style from "./database.module.scss";

// import "./coding.module.scss";

const { TabPane } = Tabs;
const { TextArea } = Input;

const DBRunCode = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  return <div>RUN CODE DB</div>;
};

export default React.memo(DBRunCode);
