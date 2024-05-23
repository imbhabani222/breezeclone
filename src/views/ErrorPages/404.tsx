import FormatText from "../../components/katexToHtml/formatText";
// import QuestionSubHeader from "../../components/questionSubHeader/QuestionSubHeader";
// import messages from "../../constants/messages";
import style from "./error404.module.scss";
import FeedbackImg from "../../assets/404.svg";

// import styles from "./newMcq.module.scss";
import React, { useState, useCallback, useEffect } from "react";
// import clsx from "clsx";
// import { Checkbox, Radio, Space } from "antd";
import { Button } from "antd";

// import ButtonGrp from "../../components/buttonGrp/buttonGrp";
// const { DESCRIPTION_LABEL } = messages;
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import constants from "../../constants/constants";

const {
  ROUTE: { DOSELECT_INSTRUCTION, FEEDBACK, SWITCH_PATH },
} = constants;

const Error404 = ({ solutionDetails }: any) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const location = useLocation();
  const slug = location.pathname.split("/")[2];

  const gotoDoSelectInformation = useCallback(() => {
    navigate(DOSELECT_INSTRUCTION.replace(":slug", slug));
  }, [navigate, slug]);

  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <div>
            <img src={FeedbackImg} alt={"ICON"} />
          </div>
          {/* <p>OOps</p> */}
          <div className={style.textContent}>
            <p>Something went wrong!</p>
            <p>The page you're looking for no longer exists.</p>
            <Button className={style.btn} onClick={gotoDoSelectInformation}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error404;
