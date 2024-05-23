import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Spin, Typography } from "antd";
import { useParams } from "react-router-dom";
import { Tooltip, Button } from "antd";

import Loader from "../../assets/loader.svg";

import style from "./fillintheBlanks.module.scss";
import styles from "../../App.module.scss";
import { useNavigate } from "react-router-dom";

import ButtonGrp from "../../components/buttonGrp/buttonGrp";
import QuestionSubHeader from "../../components/questionSubHeader/QuestionSubHeader";
import { useDispatch, useSelector } from "react-redux";

import { dataFillInBlanksFun, FooterButtons } from "./data";
import {
  getDeleteSelector,
  getAnswerPostDataSelector,
  getQuestionsSelector,
} from "../../selectors/questionsSelector";
import {
  getsolutionSet,
  getTest,
  getSingleSolStatePending,
  getSingleSolState,
  getIdentity,
  getSingleChoiceSolState,
  getSingleSolStateError,
} from "../../selectors/selectors";
import {
  getPendingQuestionsSelector,
  getSolutionSetSelector,
} from "../../selectors/problemSelector";

import { fetchSolutionSetRequest } from "../../actions/problemActions";
import {
  questionsActions,
  getSingleProblemSolAction,
  deleteAnswerAction,
} from "../../actions/questionsAction";

import {
  getAllProblemTypes,
  getAllSolvedIds,
  stringFillerInput,
} from "../../data/utils";

import TestPagination from "../../components/testLayoutSidebar/testpadSidbar";

import { postReportIssueRequest } from "../../actions/reportActions";
import { postAnswerAction } from "../../actions/postAnswerActions";
import { patchAnswerActions } from "../../actions/patchAnswerActions";
import _ from "lodash";
import QuestionTypeHeader from "../../components/QuestionTypeHeader/QuestionTypeHeader";
import Report from "../../components/Report/Report";
import constants from "../../constants/constants";
import purifyInnerHtml from "../../utils/innerHTML";

const { Paragraph } = Typography;

const {
  ROUTE: { SWITCH_PATH, TEST_SECTION_SUBMIT },
} = constants;

const FillTheBlanks = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  const [loaded, setLoaded] = useState<Boolean>(true);
  let [fibVal, setfibVal] = useState<Array<String>>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const allQuestions = useSelector(getQuestionsSelector);
  const solutionSet = useSelector(getSolutionSetSelector);
  const testDetails = useSelector(getTest);
  const SingleSolution = useSelector(getSingleSolState);
  const getDelete = useSelector(getDeleteSelector);
  const solutionStatus = useSelector(getSingleChoiceSolState);
  const mcqRequestPending = useSelector(getPendingQuestionsSelector);
  const solutionMcqError = useSelector(getSingleSolStateError);
  const getAnswerPostData = useSelector(getAnswerPostDataSelector);
  const getSingleSolDetails: any = useSelector(getIdentity);

  const { usertype, user_id, username } = getSingleSolDetails;
  const loader = <img alt="Loading" className={styles.loader} src={Loader} />;
  let disableSubmit = solutionStatus === 404;
  let patchReqParams: any;
  let getBlankInput = SingleSolution?.choice;
  const singleFIB =
    allQuestions && allQuestions?.filter((val: any) => val.slug === id);

  let allTypes: any = getAllProblemTypes(allQuestions);

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
    if (getDelete?.status === 204) {
      setfibVal(undefined);
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
    getDelete,
    usertype,
    user_id,
    username,
    testDetails.slug,
    id,
    testDetails.id,
  ]);

  useEffect(() => {
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
  }, [
    getAnswerPostData,
    solutionSet,
    dispatch,
    usertype,
    user_id,
    username,
    testDetails.slug,
    id,
  ]);

  useEffect(() => {
    let i: any;
    if (solutionMcqError === 200) {
      for (i in getBlankInput) {
        document
          .getElementsByClassName("inputString")
          [i]?.setAttribute("value", getBlankInput[i]);
      }
    } else {
      for (i in getBlankInput) {
        document
          .getElementsByClassName("inputString")
          [i]?.setAttribute("value", "");
      }
    }
  }, [getBlankInput, solutionMcqError]);

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

      setfibVal(SingleSolution?.choice);
    }
    if (solutionStatus === 404) {
      setLoaded(true);
      setfibVal(undefined);
    }
  }, [
    dispatch,
    testDetails,
    solutionSet,
    testDetails.id,
    allQuestions,
    SingleSolution,
    id,
    usertype,
    user_id,
    username,
    solutionStatus,
    mcqRequestPending,
    timedSections,
  ]);

  const reportHandler = () => {
    setIsModalVisible(true);
  };

  const subHeaderHandler = () => {
    const data = dataFillInBlanksFun({
      onOk: reportHandler,
      onCancel: clearHander,
      disabled: !fibVal,
    });
    return <QuestionSubHeader titles={data} />;
  };

  const BLANK = `<input class="inputString" placeholder="Please type your answer"  value=""/>`;
  // let emptyValue = fibVal?.every((val: any) => val === "");

  const callPostFib = () => {
    const data = FooterButtons({
      onClick: postFib,
      onSubmit: onSubmit,
      disabledsave: null,
      disabledsubmit: disableSubmit,
    });

    return <ButtonGrp className={style.footer_btn_div} buttons={data} />;
  };
  let navigate = useNavigate();

  let problemSlugParam = window.location.pathname.split("/")[4];
  let testSlug = window.location.pathname.split("/")[2];
  let [mcqIndex, setMcqIndex] = useState(0);
  let totalProblems = allQuestions.length;

  const onSubmit = () => {
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
    postFib();
  };

  const getByClassName: any = document.getElementsByClassName("inputString");
  const getArray: any = [...getByClassName].map((data) => data.value.trim());

  let choiceArray: any;
  const postFib = () => {
    setLoaded(true);

    patchReqParams = SingleSolution?.slug;

    if (getArray === undefined) {
      setfibVal(getArray);
      choiceArray = getArray;
    } else {
      choiceArray = new Array(getArray);
      setfibVal(getArray);
    }

    const payload = {
      choice: _.flatten(choiceArray),
      creator: `/api/v1/user/${username}`,
      problem: `/api/v1/problem/${id}`,
      solution_type: "FIB",
      test: `/api/v1/test/${testDetails.slug}`,
      test_solution_set: `api/v1/testsolutionset/${solutionSet.id}`,
    };

    const patchPayload = {
      choice: _.flatten(choiceArray),
      creator: `/api/v1/user/${username}`,
      problem: `/api/v1/problem/${id}`,
      solution_type: "FIB",
      test: `/api/v1/test/${testDetails.slug}`,
      test_solution_set: `api/v1/testsolutionset/${solutionSet.id}`,
    };

    if (fibVal) {
      dispatch(patchAnswerActions(patchReqParams, username, patchPayload));
      return;
    } else if (fibVal === undefined) {
    }
    dispatch(postAnswerAction(username, payload));
    // setLoaded(false);
  };

  const clearHander = () => {
    Array.from(document.getElementsByClassName("inputString")).forEach(
      (el: any) => (el.value = "")
    );
    dispatch(
      deleteAnswerAction(SingleSolution?.slug, username, {
        id: SingleSolution?.slug,
      })
    );
    dispatch(fetchSolutionSetRequest(testDetails.id));
    // setLoaded(false);
  };

  let lastSave;
  if (solutionStatus !== 404) {
    lastSave = getAnswerPostData?.modified;
  } else lastSave = "No data";

  let reportData = {
    problem_slug: id,
    test_slug: testDetails?.slug,
    platform: "PLT",
    username: username,
  };

  let solvedIds: any = getAllSolvedIds(solutionSet);

  return loaded ? (
    <div className={style.custom_testBar}>
      <QuestionTypeHeader
        lastSave={lastSave}
        type={allTypes}
        title={fibVal === undefined || "" ? "UNSOLVED" : "ATTEMPTED"}
      />
      <Report
        showModal={isModalVisible}
        closeModal={() => setIsModalVisible(false)}
        reportData={reportData}
      />
      <div className={style.container}>
        {subHeaderHandler()}
        <div className={style.question_container}>
          <Paragraph className={style.question}>
            {singleFIB &&
              singleFIB?.map((val: any) => (
                <>
                  <div>
                    {purifyInnerHtml(
                      stringFillerInput(val.description, { BLANK })
                    )}
                  </div>
                </>
              ))}
          </Paragraph>
          {callPostFib()}
        </div>
      </div>
      <TestPagination
        className={style.fib_custom_testBar}
        filterQuestions={allQuestions}
        solved={solvedIds}
        singleProblem={singleFIB}
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
    </div>
  ) : (
    <div className={style.container}>
      <Spin spinning={true} indicator={loader}></Spin>
    </div>
  );
};

export default React.memo(FillTheBlanks);
