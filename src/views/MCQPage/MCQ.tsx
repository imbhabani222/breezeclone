import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Radio, Space, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "antd";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";

import Loader from "../../assets/loader.svg";

import style from "./mcq.module.scss";
import styles from "../../App.module.scss";

import QuestionSubHeader from "../../components/questionSubHeader/QuestionSubHeader";
import { dataMcqFun, FooterButtons } from "./dataMcq";
import messages from "../../constants/messages";
import FormatText from "../../components/katexToHtml/formatText";

import {
  getDeleteSelector,
  getAnswerPostDataSelector,
  getQuestionsSelector,
  getPendingQuestionsSelector,
  getPatchAnswerDataSelector,
  getAnswerPostPendingSelector,
  getPatchAnswerPendingSelector,
} from "../../selectors/questionsSelector";
import { getSolutionSetSelector } from "../../selectors/problemSelector";
import {
  getIdentity,
  getSingleChoiceSolState,
  getSingleSolState,
  getSingleSolStatePending,
  getTest,
} from "../../selectors/selectors";

import QuestionTypeHeader from "../../components/QuestionTypeHeader/QuestionTypeHeader";

import {
  deleteAnswerAction,
  questionsActions,
  getSingleProblemSolAction,
} from "../../actions/questionsAction";
import { fetchSolutionSetRequest } from "../../actions/problemActions";

import TestPagination from "../../components/testLayoutSidebar/testpadSidbar";

import { patchAnswerActions } from "../../actions/patchAnswerActions";
import { postAnswerAction } from "../../actions/postAnswerActions";
import Report from "../../components/Report/Report";
import constants from "../../constants/constants";
import ButtonGrp from "../../components/buttonGrp/buttonGrp";
import clsx from "clsx";
import { getAllProblemTypes, getAllSolvedIds } from "../../data/utils";

const { DESCRIPTION_LABEL } = messages;

const {
  ROUTE: { SWITCH_PATH, TEST_SECTION_SUBMIT },
} = constants;

const MCQ = () => {
  const loader = <img alt="Loading" className={styles.loader} src={Loader} />;

  let { id } = useParams();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState<Boolean>(true);

  const SingleSolution = useSelector(getSingleSolState);
  const solutionDetails = useSelector(getSingleChoiceSolState);
  const solutionPendingStatus = useSelector(getSingleSolStatePending);
  const mcqRequestPending = useSelector(getPendingQuestionsSelector);
  const patchStatus = useSelector(getPatchAnswerDataSelector);
  const [mcqVal, setMcqVal] = useState<Array<String>>();
  const allQuestions = useSelector(getQuestionsSelector);
  const getIdentityDetails: any = useSelector(getIdentity);
  const getDelete = useSelector(getDeleteSelector);
  const solutionSet = useSelector(getSolutionSetSelector);
  const testDetails = useSelector(getTest);
  const getAnswerPostData = useSelector(getAnswerPostDataSelector);
  const postLoadingStatus = useSelector(getAnswerPostPendingSelector);
  const getPatchPending = useSelector(getPatchAnswerPendingSelector);
  const { usertype, user_id, username } = getIdentityDetails;

  let allTypes: any = getAllProblemTypes(allQuestions);

  const singleMcq =
    allQuestions && allQuestions?.filter((val: any) => val.slug === id);

  let patchReqParams: any;

  useEffect(() => {
    if (solutionSet === "") {
      dispatch(fetchSolutionSetRequest(testDetails.id));
    }
  }, [dispatch, testDetails, solutionSet, allQuestions]);

  useEffect(() => {
    if (getAnswerPostData.statusCode === 201) {
      dispatch(fetchSolutionSetRequest(testDetails.id));
    }
  }, [dispatch, testDetails, getAnswerPostData]);

  let timedSections = solutionSet.sections?.find((val: any) => val.status);

  useEffect(() => {
    if (!testDetails?.is_timed_section) {
      const problemIds =
        solutionSet &&
        solutionSet?.sections?.map((item: any) => item.problem_ids);
      dispatch(questionsActions(testDetails.id, problemIds));
    } else {
      const problemIds = solutionSet.sections?.find(
        (val: any) => val.status === "CTK" || ""
      );
      dispatch(questionsActions(testDetails.id, problemIds?.problem_ids));
    }
  }, [dispatch, solutionSet, testDetails.id, testDetails?.is_timed_section]);

  useEffect(() => {
    if (
      !SingleSolution ||
      (SingleSolution && SingleSolution.problem.slug !== id)
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
    if (SingleSolution && SingleSolution.problem?.slug === id) {
      setLoaded(true);
      setMcqVal(SingleSolution?.choice);
    }
    if (solutionDetails === 404) {
      setLoaded(true);
      setMcqVal(undefined);
    }
  }, [
    dispatch,
    solutionSet,
    testDetails.id,
    testDetails.slug,
    allQuestions,
    mcqRequestPending,
    usertype,
    user_id,
    username,
    id,
    SingleSolution,
    solutionDetails,
    timedSections,
  ]);

  useEffect(() => {
    if (
      getDelete?.status === 204 ||
      patchStatus?.statusCode === 202 ||
      postLoadingStatus
    ) {
      setMcqVal(undefined);
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
      dispatch(fetchSolutionSetRequest(testDetails.id));
    }
  }, [
    dispatch,
    postLoadingStatus,
    patchStatus,
    getDelete,
    usertype,
    user_id,
    username,
    testDetails.slug,
    id,
    testDetails.id,
  ]);

  let choiceArray: any;
  console.log(SingleSolution);
  const radioBtnHandler = (e: any) => {
    patchReqParams = SingleSolution?.slug;
    if (e.target === undefined) {
      setMcqVal(e);
      choiceArray = e;
    } else {
      choiceArray = new Array(e.target.value + "");
      setMcqVal(
        SingleSolution?.choice === null
          ? e.target.value
          : SingleSolution?.choice[0]
      );
    }

    const payload = {
      choice: choiceArray,
      creator: `/api/v1/user/${username}`,
      problem: `/api/v1/problem/${id}`,
      solution_type: "MCQ",
      test: `/api/v1/test/${testDetails.slug}`,
      test_solution_set: `api/v1/testsolutionset/${solutionSet.id}`,
    };

    const patchPayload = {
      code: "",
      choice: choiceArray,
      answer: "",
      technology: null,
      attachments: [],
      learn_feed_item: null,
      video_url: "",
      extra_data: {},
      file_based_data: null,
    };

    if (mcqVal) {
      dispatch(patchAnswerActions(patchReqParams, username, patchPayload));
      return;
    } else if (mcqVal === undefined) {
    }
    dispatch(postAnswerAction(username, payload));
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  let navigate = useNavigate();

  const reportHandler = () => {
    setIsModalVisible(true);
  };

  let reportData = {
    problem_slug: id,
    test_slug: testDetails?.slug,
    platform: "PLT",
    username: username,
  };

  const subHeaderHandler = () => {
    const data = dataMcqFun({
      onOk: reportHandler,
      onCancel: clearHandler,
      disabled: solutionDetails === 404,
    });
    return <QuestionSubHeader titles={data} />;
  };

  const callPostMCQ = () => {
    const data = FooterButtons({
      onSubmit: OnSubmit,
      disabled: !mcqVal,
    });
    return <ButtonGrp className={style.footer_btn_div} buttons={data} />;
  };

  let problemSlugParam = window.location.pathname.split("/")[4];
  let testSlug = window.location.pathname.split("/")[2];
  let [mcqIndex, setMcqIndex] = useState(0);
  let totalProblems = allQuestions.length;

  const OnSubmit = () => {
    let getIndex = allQuestions?.findIndex(
      (data: any) => data.slug === problemSlugParam
    );

    if (allQuestions.length === totalProblems) {
      navigate(TEST_SECTION_SUBMIT.replace(":slug", testSlug));
    }
    if (
      (mcqIndex || getIndex) >= 0 &&
      (mcqIndex || getIndex) < allQuestions.length - 1
    ) {
      setMcqIndex(getIndex + 1);
      navigate(
        SWITCH_PATH.replace(":slug", testSlug).replace(
          ":id",
          allQuestions[getIndex + 1].slug
        )
      );
    }
  };

  const clearHandler = () => {
    dispatch(
      deleteAnswerAction(SingleSolution?.slug, username, {
        id: SingleSolution?.slug,
      })
    );
  };

  let lastSave;
  if (solutionDetails !== 404) {
    lastSave = getAnswerPostData?.modified;
  } else lastSave = "No data";

  let solvedIds: any = getAllSolvedIds(solutionSet);

  return loaded ? (
    <>
      <QuestionTypeHeader
        lastSave={lastSave}
        type={allTypes}
        title={mcqVal === undefined ? "UNSOLVED" : "ATTEMPTED"}
      />
      <Report
        showModal={isModalVisible}
        reportData={reportData}
        closeModal={() => setIsModalVisible(false)}
      />
      <Spin spinning={false}>
        <div className={style.container}>
          {subHeaderHandler()}
          <div className={style.mcq_container}>
            {singleMcq &&
              singleMcq?.map((val: any, idxx: number) => (
                <>
                  <h2>{val.name}</h2>
                  <h3>{DESCRIPTION_LABEL}</h3>
                  <FormatText data={val.description} />
                  <p className={style.selectLabel}>
                    Please select your Answer.
                  </p>
                  {val.is_multi_correct ? (
                    <div className={style.mcq_option}>
                      <Spin
                        className={style.loader_mcq}
                        indicator={undefined}
                        spinning={
                          solutionPendingStatus ||
                          postLoadingStatus ||
                          getPatchPending
                        }
                      >
                        <div
                          className={clsx({
                            [style.option_content]: true,
                            [style.check_span]: getPatchPending,
                          })}
                        >
                          <Checkbox.Group
                            onChange={radioBtnHandler}
                            value={(mcqVal as any) || []}
                          >
                            <Space direction="vertical">
                              {val &&
                                val.mcq_options?.map((item: any, idx: any) => (
                                  <Checkbox
                                    key={idx}
                                    value={+item.id}
                                    className={style.sampleClass}
                                  >
                                    <FormatText data={item.content} />
                                  </Checkbox>
                                ))}
                            </Space>
                          </Checkbox.Group>
                        </div>
                        {callPostMCQ()}
                      </Spin>
                    </div>
                  ) : (
                    <div className={style.mcq_option}>
                      <Spin
                        className={style.loader_mcq}
                        indicator={undefined}
                        spinning={
                          solutionPendingStatus ||
                          postLoadingStatus ||
                          getPatchPending
                        }
                      >
                        <div className={style.option_content}>
                          <Radio.Group
                            onChange={radioBtnHandler}
                            value={mcqVal && mcqVal[0] + ""}
                          >
                            <Space direction="vertical">
                              {val &&
                                val?.mcq_options?.map((item: any, idx: any) => (
                                  <Radio
                                    key={idx}
                                    value={item.id}
                                    className={style.sampleClass}
                                  >
                                    <FormatText data={item.content} />
                                  </Radio>
                                ))}
                            </Space>
                          </Radio.Group>
                        </div>
                        {callPostMCQ()}
                      </Spin>
                    </div>
                  )}
                </>
              ))}
          </div>
        </div>
      </Spin>
      <TestPagination
        filterQuestions={allQuestions}
        singleProblem={singleMcq}
        solved={solvedIds}
        callBack={() =>
          dispatch(
            getSingleProblemSolAction(
              usertype,
              user_id,
              "PLT",
              username,
              testDetails.slug,
              id
            )
          )
        }
      />
    </>
  ) : (
    <div className={style.container}>
      <Spin spinning={true} indicator={loader}></Spin>
    </div>
  );
};

export default React.memo(MCQ);
