import React from "react";
import { Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";

import FeedbackComplete from "../../assets/Images/feedbackComplete.svg";

import style from "./TestComplete.module.scss";
import { getIdentity } from "../../selectors/selectors";

import messages from "../../constants/messages";
import DataBar from "../../components/dataBar/dataBar";
import { stringFiller } from "../../data/utils";

const { Paragraph } = Typography;

const {
  FEEDBACK: { FEEDBACKCOMPLETED, FEEDBACKNOTIFIED },
  ICON,
} = messages;

const TestComplate = () => {
  const identityDetails: any = useSelector(getIdentity);

  let orgName = identityDetails?.org;
  const getOrgNameText = () => {
    return stringFiller(FEEDBACKNOTIFIED, { orgName });
  };

  return (
    <div className={style.container}>
      <div className={style.section1}>
        <img src={FeedbackComplete} alt={ICON} />
        <h1>{FEEDBACKCOMPLETED}</h1>
        <Paragraph>{getOrgNameText()}</Paragraph>
      </div>
    </div>
  );
};

export default React.memo(TestComplate);
