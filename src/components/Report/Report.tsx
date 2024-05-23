import React, { useState, useCallback } from "react";
import { Button, Radio, Space, Row, Col, Input } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import ReportStyle from "../Report/Report.module.scss";

import { reportcontent } from "../../data/reportContent";
import BreezeModal from "../../components/modal/modal";
import messages from "../../constants/messages";
import { postReportIssueRequest } from "../../actions/reportActions";
import { useDispatch, useSelector } from "react-redux";

const {
  FEEDBACK: { SUBMIT_LABEL },
  REPORT_LABLE,
  REPORT_MODAL_INPUT_LABEL,
  TYPE_FILLED,
} = messages;

const Report = ({ showModal, closeModal, reportData }: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isdisable, setIsDisable] = useState(true);
  const [value, setValue] = useState("");
  const [inputval, setInputVal] = useState("");
  const dispatch = useDispatch();

  const showModal2 = useCallback(() => {
    setIsModalVisible(true);
    setValue("");
    setInputVal("");
  }, []);

  const handleOk = () => {
    const payload = {
      comment: inputval || value,
      problem_slug: reportData.problem_slug,
      test_slug: reportData.test_slug,
      category: "content",
    };
    dispatch(
      postReportIssueRequest(reportData.platform, reportData.username, payload)
    );
    closeModal();
    setValue("");
    setInputVal("");
  };

  const handleCancel = useCallback(() => {
    closeModal();
    setValue("");
    setInputVal("");
  }, [closeModal]);

  const handleChange = useCallback((e) => {
    setIsDisable(e.target.value !== "" ? false : true);
    setInputVal(e.target.value);
  }, []);

  const handelmouse = useCallback(() => {
    setValue("");
  }, []);

  const onChange = useCallback((e) => {
    setIsDisable(e.target.value === "");
    setValue(e.target.value);
    setInputVal("");
  }, []);
  const data = {
    // onOk: handleOk,
    onCancel: handleCancel,
    buttons: [
      {
        type: TYPE_FILLED,
        display: SUBMIT_LABEL,
        onClick: handleOk,
        disabled: isdisable,
      },
    ],
  };
  return (
    <div className={ReportStyle.report_container}>
      <BreezeModal
        contentType={true}
        modalHead={true}
        modalData={data}
        visible={showModal}
        showContent={true}
        width={780}
        Content={
          <Row className={ReportStyle.report_modal}>
            <h2>Report an issue with Stack Using Interface</h2>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              style={{ textAlign: "center" }}
            >
              <Radio.Group defaultValue="" onChange={onChange} value={value}>
                <Space direction="vertical">
                  {reportcontent?.map((ele) => (
                    <Radio.Button value={ele.question}>
                      {ele.question}
                    </Radio.Button>
                  ))}
                </Space>
              </Radio.Group>
              <div className={ReportStyle.Inputstyle} onClick={handelmouse}>
                <div
                  // className={ReportStyle.Inputlabel}
                  className="inputLable"
                >
                  {REPORT_MODAL_INPUT_LABEL}
                </div>
                <div>
                  <Input
                    placeholder={REPORT_MODAL_INPUT_LABEL}
                    onChange={(e) => handleChange(e)}
                    value={inputval}

                    // disabled={value !== ""}
                  />
                </div>
              </div>
            </Col>
          </Row>
        }
      />
    </div>
  );
};

export default React.memo(Report);
