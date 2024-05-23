import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Row, Rate, Input, Button, Form, Typography, Col, Divider } from "antd";

import FeedbackImg from "../../assets/Images/feedbackLady.svg";

import style from "./Feedback.module.scss";

import constants from "../../constants/constants";
import messages from "../../constants/messages";
import feedbackQA from "../../data/feedback-questions.json";
import { postFeedbackRequest } from "../../actions/feedbackActions";
import { getIdentity } from "../../selectors/selectors";
import { stringFiller } from "../../data/utils";

const { Paragraph } = Typography;

const {
  FEEDBACK: {
    FEEDBACKCOMPLETED,
    FEEDBACKTITLE,
    FEEDBACKNOTIFIED,
    SENDFEEDBACK,
    LIKETOTELL,
    ENTERFEWWORDS,
    MESSAGE_LABEL,
    SUBMIT_LABEL,
    FEEDBACKFORM,
  },
  ICON,
} = messages;

const {
  ROUTE: { TESTCOMPLETE },
} = constants;

interface FeedbackProps {
  history: any;
}

const Feedback: React.FC<FeedbackProps> = ({ history }) => {
  const dispatch = useDispatch();

  let navigate = useNavigate();

  const location = useLocation();
  const [isDisabled, setDisabled] = useState(true);
  const [charCount, setCharCount] = useState(0);
  const slug = location.pathname.split("/")[2];
  const [form] = Form.useForm();

  const identityDetails: any = useSelector(getIdentity);

  let data = form.getFieldsValue();
  const onValueChange = (e: any) => {
    let alldata = form.getFieldsValue();
    console.log(alldata);
    let allValues: any = Object.values(alldata);
    allValues.pop();
    let allTrue = allValues.every((val: any) => val !== undefined && val !== 0);
    setDisabled(!allTrue);
  };

  const onFinish = (e: any) => {
    const payload = {
      ...data,
      feedback: data.message,
      test_slug: slug,
      source: "PT",
    };
    dispatch(postFeedbackRequest(identityDetails?.username, payload));
    navigate(TESTCOMPLETE.replace(":slug", slug));
  };

  let orgName = identityDetails?.org;
  const getNotificationText = () => {
    return stringFiller(FEEDBACKNOTIFIED, { orgName });
  };

  return (
    <Row className={style.maincontainer}>
      <div className={style.container}>
        <div className={style.section1}>
          <Row>
            <Col md={7} sm={24} xs={24}>
              <div>
                <img src={FeedbackImg} alt={ICON} />
              </div>
            </Col>
            <Col md={16} sm={24} xs={24}>
              <h2>{FEEDBACKCOMPLETED}</h2>
              <Paragraph>{getNotificationText()}</Paragraph>
            </Col>
          </Row>
        </div>
        <Divider className={style.divider}>{FEEDBACKTITLE}</Divider>
        <Form name={FEEDBACKFORM} form={form} onFinish={onFinish}>
          <Row>
            <div className={style.section2}>
              {feedbackQA.map((val, index) => (
                <Col md={11} sm={24} xs={24} className={style.colgap}>
                  <div className={style.contentBox}>
                    <div key={index}>
                      <h6>{val.question}</h6>
                    </div>
                    <div className={style.stars}>
                      <Row>
                        <Form.Item name={val.name}>
                          <Rate
                            allowHalf={false}
                            defaultValue={0}
                            count={5}
                            onChange={onValueChange}
                          />
                        </Form.Item>
                      </Row>
                      <Row className={style.starspara}>
                        <Col md={11} sm={24} xs={24}>
                          <Paragraph>{val.label1}</Paragraph>
                        </Col>
                        <Col md={11} sm={24} xs={24}>
                          {" "}
                          <Paragraph>{val.label2}</Paragraph>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              ))}

              <Col md={11} sm={24} xs={24} className={style.colgap}>
                <div className={style.textBox}>
                  <h6>{LIKETOTELL}</h6>
                  <Form.Item name={MESSAGE_LABEL}>
                    <Input.TextArea
                      className={style.textboxInput}
                      value={""}
                      showCount
                      placeholder={ENTERFEWWORDS}
                      maxLength={1000}
                    />
                  </Form.Item>
                </div>
              </Col>
            </div>
          </Row>
          <Row>
            <div className={style.btn_send}>
              <Button
                onClick={onFinish}
                htmlType={"submit"}
                disabled={isDisabled}
              >
                {SENDFEEDBACK}
              </Button>
            </div>
          </Row>
        </Form>
      </div>
    </Row>
  );
};

Feedback.propTypes = {
  history: PropTypes.object,
};

export default React.memo(Feedback);
