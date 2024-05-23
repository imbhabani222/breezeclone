import { Tabs, Button, Input, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "react-quill/dist/quill.snow.css";
import style from "./coding.module.scss";
import _isEmpty from "lodash/isEmpty";

import "./coding.module.scss";

import { Menu, Dropdown, Space } from "antd";

import constants from "../../constants/constants";

import messages from "../../constants/messages";
import Viewresult from "../../components/viewresult/viewresult";
import Loader from "../../assets/loader.svg";

import arrowdown from "../../assets/whitedropdown.svg";
import clsx from "clsx";

import checkmark from "../../assets/checkmark.svg";
import {
  getcheckAction,
  getCustomResult,
  getSingleSolStateError,
  getTestCasesResult,
} from "../../selectors/selectors";

import {
  runCodeWithCustomInputRequest,
  postSolutionsSubmitRequest,
} from "../../actions/codingActions";
import {
  getAnswerPostDataSelector,
  getPatchAnswerDataSelector,
  getQuestionsSelector,
} from "../../selectors/questionsSelector";
import { onSubmitFun } from "../../data/utils";

const {
  FEEDBACK: { SUBMIT_LABEL },
  RUN_CODE_LABEL,
  ABORT_LABEL,
  TEST_RESULTS_LABEL,
  CUSTOM_INPUT_LABEL,
} = messages;

const {
  ROUTE: { SWITCH_PATH, TEST_SECTION_SUBMIT },
} = constants;

const { TabPane } = Tabs;
const { TextArea } = Input;

const NewRunCodeContainer = ({
  reportHandler,
  solutionDetails,
  currentQuestion,
  currentPage,
  currentAnswer,
  saveAnswer,
  clearHandler,
  currentAnswerExist,
  username,
  id,
  slug,
  solutionSetId,
  actionDisable,
  toggleReportHandler,
  nextPage,
  codeData,
  statusBar,
  fullScreen,
  handleLanguage,
}: any) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(codeData, "codedataaaa");

  const resultTab = "result";
  const customInputTab = "input";

  const loaderImg = <img alt="Loading" className={style.loader} src={Loader} />;

  const [activeTab, setActiveTab] = useState(resultTab);
  const [inputValue, SetInputValue] = useState("");
  const [activeKey, setactiveKey] = useState("1");
  const [customSelected, setCustomSelected] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [handleEvaluate, setHandleEvaluate] = useState(true);
  const [loader, setloader] = useState(false);
  const [disableRunCodeBtn, setdisableRunCodeBtn] = useState(false);

  const checkActionData: any = useSelector(getcheckAction);
  const getCodeAsyncData: any = useSelector(getCustomResult);
  const getTestResultData: any = useSelector(getTestCasesResult);
  const getAnswerPostData = useSelector(getAnswerPostDataSelector);
  const getSingleSolErrorOnChange = useSelector(getSingleSolStateError);
  const allQuestions = useSelector(getQuestionsSelector);

  const getAnswerPatch = useSelector(getPatchAnswerDataSelector);

  useEffect(() => {
    if (getAnswerPostData?.statusCode === 201 && !submitted) {
      let postSubmitpayload = {
        sockmeta: {
          connid: checkActionData?.data?.socketDetails?.connid,
          wid: checkActionData?.data?.socketDetails?.wid,
          sockid: checkActionData?.data?.socketDetails?.sockid,
        },
        solution_id: getAnswerPostData && getAnswerPostData?.data?.id,
      };
      dispatch(postSolutionsSubmitRequest(postSubmitpayload, username));
    }
  }, [
    checkActionData?.data?.getSocketArgs,
    dispatch,
    username,
    submitted,
    getAnswerPostData,
    getAnswerPostData?.id,
    getAnswerPostData?.statusCode,
    checkActionData?.data?.socketDetails?.connid,
    checkActionData?.data?.socketDetails?.wid,
    checkActionData?.data?.socketDetails?.sockid,
  ]);

  useEffect(() => {
    if (getAnswerPatch?.statusCode === 202) {
      let postSubmitpayload = {
        sockmeta: {
          connid: checkActionData?.data?.socketDetails?.connid,
          wid: checkActionData?.data?.socketDetails?.wid,
          sockid: checkActionData?.data?.socketDetails?.sockid,
        },
        solution_id: getAnswerPatch && getAnswerPatch?.data?.id,
      };
      dispatch(postSolutionsSubmitRequest(postSubmitpayload, username));
    }
  }, [
    checkActionData?.data?.getSocketArgs,
    dispatch,
    username,
    getAnswerPatch?.statusCode,
    getAnswerPatch,
    slug,
    id,
    checkActionData?.data?.socketDetails?.connid,
    checkActionData?.data?.socketDetails?.wid,
    checkActionData?.data?.socketDetails?.sockid,
  ]);

  const handledropdownTestCases = () => {
    setdisableRunCodeBtn(true);
    handleRunCode();
    setActiveTab(resultTab);
    setCustomSelected(false);
  };

  const handleRunAllTestCases = () => {
    handledropdownTestCases();
  };

  useEffect(() => {
    if (!_isEmpty(getCodeAsyncData)) {
      setloader(false);
      setdisableRunCodeBtn(false);
    }
  }, [getCodeAsyncData]);

  /////////////////////

  console.log(getTestResultData, " getTestResultData");

  useEffect(() => {
    if (
      !getTestResultData?.data?.fetching &&
      getTestResultData?.data?.getCodeEvaluatedData !== null
    ) {
      setloader(false);
      setdisableRunCodeBtn(false);
    }
  }, [getTestResultData]);

  const handledropdownCustom = (e: any) => {
    setactiveKey("1");
    setdisableRunCodeBtn(true);

    setActiveTab(customInputTab);
    setHandleEvaluate(false);
    setloader(true);

    setCustomSelected(true);
    // setTimeout(() => {
    //   setloader(false);
    //   setdisableRunCodeBtn(false);
    // }, 3000);

    if (_isEmpty(getCodeAsyncData)) {
      setloader(true);
    }

    let customPayload = {
      code: codeData || "process.stdin.resu",
      input: inputValue,
      problem_id: currentQuestion?.id,

      sockmeta: {
        connid: checkActionData?.data?.socketDetails?.connid,
        wid: checkActionData?.data?.socketDetails?.wid,
        sockid: checkActionData?.data?.socketDetails?.sockid,
      },
      solution_id: getAnswerPostData && getAnswerPostData?.data?.id,

      technology: "bash",
      username: username,
    };
    dispatch(runCodeWithCustomInputRequest("SCR", customPayload));
    return;
  };

  const storeAnswer = (ans: any) => {
    if (currentAnswer === null) {
      const payload = {
        problem: `/api/v1/problem/${id}`,
        creator: `/api/v1/user/${username}`,
        solution_type: "SCR",
        code: ans,
        test_solution_set: `api/v1/testsolutionset/${solutionSetId}`,
        test: `/api/v1/test/${slug}`,
        technology: `/api/v1/technology/${"java8"}`,
      };
      saveAnswer(payload);
    } else {
      const patchPayload = {
        code: ans,
        technology: `/api/v1/technology/${"java8"}`,
      };
      saveAnswer(patchPayload);
    }
  };

  const handleRunCode = () => {
    setdisableRunCodeBtn(true);
    setloader(true);

    setactiveKey("1");
    setHandleEvaluate(false);

    // setTimeout(() => {
    //   setloader(false);
    //   setdisableRunCodeBtn(false);
    // }, 5000);

    if (_isEmpty(getTestResultData)) {
      setloader(true);
    }

    setTimeout(() => {
      if (_isEmpty(getTestResultData)) {
        setloader(false);
        setdisableRunCodeBtn(false);
      }
    }, 40000);

    if (currentAnswer !== null && getSingleSolErrorOnChange !== 404) {
      storeAnswer(codeData);
      return;
    }
    storeAnswer(codeData);
  };

  const testSubmit = () => {
    storeAnswer(codeData);
  };

  const onSubmit = () => {
    setSubmitted(true);
    testSubmit();
    nextPage();
  };

  const onAbort = () => {
    setdisableRunCodeBtn(false);
    setloader(false);
    setHandleEvaluate(true);
    // window.location.reload();
  };

  const menu = (
    <div
      className={clsx({
        [style.drop]: true,
        [style.dropFullScreen]: fullScreen,
      })}
    >
      <Menu>
        <Menu.Item
          key={customInputTab}
          className={clsx({
            [style.activeTabBg]: activeTab === customInputTab,
          })}
        >
          {activeTab === customInputTab ? (
            <img src={checkmark} alt={"Img"} />
          ) : null}
          <Button onClick={handledropdownCustom}>Custom Input</Button>
        </Menu.Item>
        <Menu.Item
          key={activeTab}
          className={clsx({
            [style.activeTabBg]: activeTab === resultTab,
          })}
        >
          {activeTab === resultTab ? <img src={checkmark} alt={"Img"} /> : null}
          <Button onClick={handledropdownTestCases}>Test Cases</Button>
        </Menu.Item>
        <Menu></Menu>
      </Menu>
    </div>
  );

  const Operations = {
    left: (
      <div className={style.btn_container}>
        {!disableRunCodeBtn ? (
          <Space>
            <Dropdown.Button
              icon={
                <div className={style.dropdown}>
                  <img src={arrowdown} alt={"Img"} />
                </div>
              }
              // visible
              overlay={menu}
              className={clsx({
                [style.run_btn]: true,
              })}
              onClick={handleRunCode}
            >
              {RUN_CODE_LABEL}
            </Dropdown.Button>
          </Space>
        ) : null}
        {disableRunCodeBtn ? (
          <Button className={style.abort_btn} onClick={onAbort}>
            {ABORT_LABEL}
          </Button>
        ) : null}

        <Button className={style.submit_btn} onClick={onSubmit}>
          {SUBMIT_LABEL}
        </Button>
      </div>
    ),
  };

  const handleKeyChange = (key: any) => {
    setactiveKey(key);
    if (key === "2") {
      setActiveTab(customInputTab);
      setCustomSelected(true);
    }
  };

  const handleInputChange = (e: any) => {
    SetInputValue(e.target.value);
  };

  return (
    <>
      <div>
        <div className={style.row_2}>
          <div className={style.first_row}>
            <div className={style.lineNum}>
              <p>
                <span className={style.dot}></span>
                {/* Automate ready */}
              </p>
              <p>{statusBar} Assembly</p>
            </div>
          </div>
        </div>
        <div className={style.row_3}>
          <div className={style.tab_container}>
            <div className={style.tab_content}>
              <Tabs
                type="card"
                tabBarExtraContent={Operations}
                activeKey={activeKey}
                onChange={handleKeyChange}
              >
                <TabPane tab={TEST_RESULTS_LABEL} key={"1"}>
                  {loader ? (
                    <Spin
                      spinning={true}
                      indicator={loaderImg}
                      size="large"
                    ></Spin>
                  ) : (
                    <div>
                      {handleEvaluate ? (
                        <div className={style.testResult}>
                          <h3>Click on "Run code" to evaluate your solution</h3>
                        </div>
                      ) : (
                        <Viewresult
                          currentQuestion={currentQuestion}
                          handleRunAllTestCases={handleRunAllTestCases}
                          selectedType={customSelected}
                          run_details={getTestResultData?.data}
                          customAsyncData={
                            getCodeAsyncData?.data?.getCodeAsyncData
                          }
                        />
                      )}
                    </div>
                  )}
                </TabPane>
                <TabPane tab={CUSTOM_INPUT_LABEL} key={"2"}>
                  <p className={style.tab2_text}>{"STDIN"} </p>
                  <div className={style.tab2_textarea}>
                    <TextArea
                      rows={10}
                      value={inputValue}
                      onChange={(e) => handleInputChange(e)}
                    />
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(NewRunCodeContainer);
