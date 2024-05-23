import { Tabs, Button, Input, Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import arrowdown from "../../assets/whitedropdown.svg";

import checkmark from "../../assets/checkmark.svg";

import { Menu, Dropdown, Space } from "antd";

import "react-quill/dist/quill.snow.css";
import style from "./coding.module.scss";

import "./coding.module.scss";
import Loader from "../../assets/loader.svg";

import {
  getAnswerPostDataSelector,
  getPatchAnswerDataSelector,
  getQuestionsSelector,
} from "../../selectors/questionsSelector";

import {
  getTest,
  getSingleSolStatePending,
  fetchPostSolutionSubmitSelector,
  getSingleSolState,
  getIdentity,
  getSingleChoiceSolState,
  getSingleSolStateError,
  getcheckAction,
  getCustomResult,
  getTestCasesResult,
} from "../../selectors/selectors";
import {
  getPendingQuestionsSelector,
  getSolutionSetSelector,
} from "../../selectors/problemSelector";

import { fetchSolutionSetRequest } from "../../actions/problemActions";
import {
  questionsActions,
  getSingleProblemSolAction,
} from "../../actions/questionsAction";

import {
  runCodeWithCustomInputRequest,
  postSolutionsSubmitRequest,
} from "../../actions/codingActions";
import clsx from "clsx";
import { postAnswerAction } from "../../actions/postAnswerActions";
import { patchAnswerActions } from "../../actions/patchAnswerActions";
import constants from "../../constants/constants";

import messages from "../../constants/messages";
import Viewresult from "../../components/viewresult/viewresult";
import { fetchTechnologiesDetails } from "../../actions/assessmentActions";
import { WebSocketContext } from "../../utils/socket";
import _ from "lodash";
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

const RunCodeContainer = ({
  codeData,
  statusBar,
  handleLanguage,
  fullScreen,
}: any) => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const ws: any = useContext(WebSocketContext);
  let navigate = useNavigate();

  const resultTab = "result";
  const customInputTab = "input";

  // const socketData = useSelector();
  const checkActionData: any = useSelector(getcheckAction);
  const allQuestions = useSelector(getQuestionsSelector);
  const solutionSet = useSelector(getSolutionSetSelector);
  const solutionDetails = useSelector(getSingleChoiceSolState);
  const solutionPending = useSelector(getSingleSolStatePending);
  const testDetails = useSelector(getTest);
  // const solution = useSelector(getSingleSolState);
  const getSingleSolDetails: any = useSelector(getIdentity);
  const questionRequestPending = useSelector(getPendingQuestionsSelector);
  const getAnswerPostData = useSelector(getAnswerPostDataSelector);
  const getAnswerPatch = useSelector(getPatchAnswerDataSelector);
  // console.log(getAnswerPatch?.statusCode, "status answerrrr");
  const getsolutionSubmitStatus = useSelector(fetchPostSolutionSubmitSelector);
  const SingleSolutionData = useSelector(getSingleSolState);
  const getSingleSolErrorOnChange = useSelector(getSingleSolStateError);
  const getCodeAsyncData: any = useSelector(getCustomResult);
  const getTestResultData: any = useSelector(getTestCasesResult);

  let [mcqIndex, setMcqIndex] = useState(0);
  const [codeValue, setCodeValue] = useState(codeData || "");
  const [activeTab, setActiveTab] = useState(resultTab);
  const [inputValue, SetInputValue] = useState("");
  const [activeKey, setactiveKey] = useState("1");
  const [customSelected, setCustomSelected] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [handleEvaluate, setHandleEvaluate] = useState(true);
  const [loader, setloader] = useState(false);
  const [disableRunCodeBtn, setdisableRunCodeBtn] = useState(false);

  const { usertype, user_id, username } = getSingleSolDetails;
  const loaderImg = <img alt="Loading" className={style.loader} src={Loader} />;

  let patchReqParams = SingleSolutionData?.slug;

  let timedSections = solutionSet.sections?.find((val: any) => val.status);

  const problemData =
    allQuestions && allQuestions?.filter((val: any) => val.slug === id);

  useEffect(() => {
    dispatch(fetchTechnologiesDetails());
  }, [dispatch]);

  useEffect(() => {
    if (solutionSet !== "" && !questionRequestPending && !allQuestions) {
      if (timedSections !== undefined) {
        const problemIds = solutionSet.sections?.find(
          (val: any) => val.status === "CTK" || ""
        );
        dispatch(questionsActions(testDetails.id, problemIds.problem_ids));
      } else {
        const problemIds =
          solutionSet &&
          solutionSet?.sections?.map((item: any) => item.problem_ids);
        dispatch(questionsActions(testDetails.id, problemIds));
      }
    }

    if (SingleSolutionData && SingleSolutionData.problem?.slug === id) {
      // setSubValue(solution?.answer);
    }
    if (solutionDetails === 404) {
      // setSubValue(undefined);
    }
  }, [
    dispatch,
    solutionSet,
    testDetails.id,
    allQuestions,
    solutionPending,
    SingleSolutionData,
    id,
    testDetails.slug,
    usertype,
    user_id,
    username,
    solutionDetails,
    questionRequestPending,
    timedSections,
  ]);

  useEffect(() => {
    if (solutionSet === "") {
      dispatch(fetchSolutionSetRequest(testDetails.id));
    }
  }, [dispatch, testDetails, solutionSet, allQuestions]);

  useEffect(() => {
    if (getsolutionSubmitStatus.statusCode === 202) {
      dispatch(
        getSingleProblemSolAction(
          usertype,
          user_id,
          "PLT",
          username,
          testDetails.slug,
          id
        )
      );
    }
  }, [
    dispatch,
    getsolutionSubmitStatus?.statusCode,
    id,
    testDetails?.slug,
    user_id,
    username,
    usertype,
  ]);

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

  ////////////PATCH
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
      dispatch(
        getSingleProblemSolAction(
          usertype,
          user_id,
          "PLT",
          username,
          testDetails.slug,
          id
        )
      );
    }
  }, [
    checkActionData?.data?.getSocketArgs,
    dispatch,
    username,
    getAnswerPatch?.statusCode,

    getAnswerPatch,
    usertype,
    user_id,
    testDetails?.slug,
    id,
    checkActionData?.data?.socketDetails?.connid,
    checkActionData?.data?.socketDetails?.wid,
    checkActionData?.data?.socketDetails?.sockid,
  ]);

  /////////////////////
  const handleInputChange = (e: any) => {
    SetInputValue(e.target.value);
  };

  //STEP:1. find coding solution exists
  useEffect(() => {
    if (
      !SingleSolutionData ||
      (SingleSolutionData && SingleSolutionData.problem.slug !== id)
    ) {
      dispatch(
        getSingleProblemSolAction(
          usertype,
          user_id,
          "PLT",
          username,
          testDetails.slug,
          id
        )
      );
    }
    if (SingleSolutionData && SingleSolutionData.problem?.slug === id) {
      // setLoaded(true);
      // setMcqVal(SingleSolution?.choice);
    }
    if (solutionDetails === 404) {
      // setLoaded(true);
      // setMcqVal(undefined);
    }
  }, [
    dispatch,
    SingleSolutionData,
    id,
    solutionDetails,
    testDetails.slug,
    user_id,
    username,
    usertype,
  ]);

  // useEffect(() => {
  //   if (getAnswerPostData.statusCode === 201 && inputValue.length === 0) {
  //     dispatch(
  //       getSingleProblemSolAction(
  //         usertype,
  //         user_id,
  //         "PLT",
  //         username,
  //         testDetails.slug,
  //         id
  //       )
  //     );
  //     /// after post do patch
  //   }
  // }, [
  //   dispatch,
  //   testDetails,
  //   getAnswerPostData,
  //   usertype,
  //   user_id,
  //   username,
  //   id,
  //   inputValue.length,
  // ]);

  let payload = {
    problem: `/api/v1/problem/${id}`,
    creator: `/api/v1/user/${username}`,
    solution_type: "SCR",
    code: codeValue || "process.stdin.resu",
    test_solution_set: `api/v1/testsolutionset/${solutionSet.id}`,
    test: `/api/v1/test/${testDetails.slug}`,
    technology: `/api/v1/technology/${"c"}`,
  };

  let patchPayload = {
    code: codeValue || "process.stdin.resu",
    technology: `/api/v1/technology/${"c"}`,
    extra_data: {
      code: {
        lock_range: {
          head: null,
          tail: null,
        },
        stub_length: {
          head: null,
          tail: null,
        },
      },
    },
  };

  const testSubmit = () => {
    if (SingleSolutionData !== undefined && getSingleSolErrorOnChange !== 404) {
      dispatch(patchAnswerActions(patchReqParams, username, patchPayload));
      return;
    }
    dispatch(postAnswerAction(username, payload));
  };

  const onSubmit = () => {
    setSubmitted(true);
    testSubmit();

    onSubmitFun(allQuestions, 0, navigate);
    // postFib();
  };

  const handleRunCode = () => {
    setdisableRunCodeBtn(true);
    setloader(true);
    setActiveTab(resultTab);
    setactiveKey("1");
    setHandleEvaluate(false);

    setTimeout(() => {
      setloader(false);
      setdisableRunCodeBtn(false);
    }, 5000);

    console.log(codeValue);

    // if (inputValue.length > 0) {
    //   // setactiveKey("2");
    //   setActiveTab(customInputTab);
    //   setactiveKey("1");
    //   setHandleEvaluate(false);
    //   let customPayload = {
    //     technology: "c",
    //     code: codeValue || "process.stdin.resu   useeffect",
    //     input: inputValue,
    //     problem_id: problemData[0]?.id,

    //     username: username,
    //     sockmeta: {
    //       connid: checkActionData?.data?.socketDetails?.connid,
    //       wid: checkActionData?.data?.socketDetails?.wid,
    //       sockid: checkActionData?.data?.socketDetails?.sockid,
    //     },
    //     solution_id: getAnswerPostData && getAnswerPostData?.data?.id,
    //   };
    //   dispatch(runCodeWithCustomInputRequest("SCR", customPayload));
    //   return;
    // }

    if (SingleSolutionData !== undefined && getSingleSolErrorOnChange !== 404) {
      dispatch(patchAnswerActions(patchReqParams, username, patchPayload));
      return;
    }
    dispatch(postAnswerAction(username, payload));
  };

  //////////////////

  const onAbort = () => {
    setdisableRunCodeBtn(false);
    setloader(false);
    setHandleEvaluate(true);
    // window.location.reload();
  };

  const handledropdownTestCases = () => {
    setdisableRunCodeBtn(true);

    handleRunCode();
    setActiveTab(resultTab);
    setCustomSelected(false);
  };

  const handleRunAllTestCases = () => {
    handledropdownTestCases();
  };

  const handledropdownCustom = (e: any) => {
    setdisableRunCodeBtn(true);
    console.log("ACSAC");

    setActiveTab(customInputTab);
    setHandleEvaluate(false);
    setloader(true);

    setCustomSelected(true);
    setTimeout(() => {
      setloader(false);
      setdisableRunCodeBtn(false);
    }, 6000);
    console.log(checkActionData?.data);

    let customPayload = {
      code: codeData || "process.stdin.resu",
      input: inputValue,
      problem_id: problemData[0]?.id,

      sockmeta: {
        connid: checkActionData?.data?.socketDetails?.connid,
        wid: checkActionData?.data?.socketDetails?.wid,
        sockid: checkActionData?.data?.socketDetails?.sockid,
      },
      solution_id: getAnswerPostData && getAnswerPostData?.data?.id,

      technology: "bash",
      username: username,
      // solution_id: getAnswerPostData && getAnswerPostData?.data?.id,
    };
    console.log(customPayload);

    dispatch(runCodeWithCustomInputRequest("SCR", customPayload));
    return;
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
  };

  return (
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
                        problemData={problemData}
                        handleRunAllTestCases={handleRunAllTestCases}
                        selectedType={customSelected || inputValue.length > 0}
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
                    onClick={() => setActiveTab(customInputTab)}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RunCodeContainer);
