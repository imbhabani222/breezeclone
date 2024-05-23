import { Tabs, Button, Input, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "react-quill/dist/quill.snow.css";
import style from "./coding.module.scss";

import "./coding.module.scss";
import _isEmpty from "lodash/isEmpty";

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

const CommonRunCodeContainer = ({
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

  codeData,
  statusBar,
  fullScreen,
  handleLanguage,
}: any) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(currentQuestion?.problem_type, "currentQuestion");

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

  // console.log(getTestResultData, "oooooooooooooooooooo");

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

  useEffect(() => {
    if (!_isEmpty(getCodeAsyncData)) {
      setloader(false);
      setdisableRunCodeBtn(false);
    }
  }, [getCodeAsyncData]);

  const handleRunCode = () => {
    setactiveKey("1");
    setdisableRunCodeBtn(true);

    setActiveTab(customInputTab);
    setHandleEvaluate(false);
    setloader(true);

    setCustomSelected(true);
    // setTimeout(() => {
    //   setloader(false);
    //   setdisableRunCodeBtn(false);
    // }, 6000);

    if (_isEmpty(getCodeAsyncData)) {
      setloader(true);
    }

    let customPayload = {
      code: 'use test;\n/*\n * Enter your query below.\n * Please append a semicolon ";" at the end of the query\n */',

      input: inputValue,
      problem_id: currentQuestion?.id,

      sockmeta: {
        connid: checkActionData?.data?.socketDetails?.connid,
        wid: checkActionData?.data?.socketDetails?.wid,
        sockid: checkActionData?.data?.socketDetails?.sockid,
      },
      solution_id:
        (getAnswerPostData && getAnswerPostData?.data?.id) || solutionSetId,

      technology: "mysql",
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
        code: 'use test;\n/*\n * Enter your query below.\n * Please append a semicolon ";" at the end of the query\n */',
        choice: null,
        answer: "",
        technology: "/api/v1/technology/mysql",
        attachments: [],
        learn_feed_item: null,
        video_url: "",
        extra_data: {
          code: {
            lock_range: {
              head: "1-2",
              tail: null,
            },
            stub_length: {
              head: 1,
              tail: null,
            },
          },
        },
        file_based_data: null,
      };
      saveAnswer(patchPayload);
    }
  };

  const testSubmit = () => {
    storeAnswer(codeData);
  };

  const onSubmit = () => {
    setSubmitted(true);
    testSubmit();

    onSubmitFun(allQuestions, 0, navigate);
    // postFib();
  };

  const onAbort = () => {
    setdisableRunCodeBtn(false);
    setloader(false);
    setHandleEvaluate(true);
    // window.location.reload();
  };

  const Operations = {
    left: (
      <div className={style.btn_container}>
        {!disableRunCodeBtn ? (
          <Space>
            <Button
              className={clsx({
                [style.run_btn]: true,
              })}
              onClick={handleRunCode}
            >
              {RUN_CODE_LABEL}
            </Button>
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
                <TabPane tab={"Output"} key={"1"}>
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
                          selectedType={customSelected}
                          customAsyncData={
                            getCodeAsyncData?.data?.getCodeAsyncData
                          }
                        />
                      )}
                    </div>
                  )}
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(CommonRunCodeContainer);
