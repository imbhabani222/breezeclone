import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { notification, Spin } from "antd";

import styles from "./testSwitch.module.scss";
import global_styles from "../../App.module.scss";

import Loader from "../../assets/loader.svg";
import tick from "../../assets/tick.svg";

import { fetchSolutionSetRequest } from "../../actions/problemActions";
import {
  deleteAnswerAction,
  getSingleProblemSolAction,
  questionsActions,
} from "../../actions/questionsAction";
import QuestionTypeHeader from "../../components/QuestionTypeHeader/QuestionTypeHeader";
import TestPagination from "../../components/testLayoutSidebar/testpadSidbar";
import NewMcq from "../MCQPage/newMCQ";
import { getAllSolvedIds } from "../../data/utils";
import { getSolutionSetSelector } from "../../selectors/problemSelector";
import {
  getAnswerPostDataSelector,
  getDeleteSelector,
  getPatchAnswerDataSelector,
  getQuestionsSelector,
} from "../../selectors/questionsSelector";
import {
  getIdentity,
  getSingleChoiceSolState,
  getSingleSolState,
  getTest,
} from "../../selectors/selectors";
import constants from "../../constants/constants";
import { postAnswerAction } from "../../actions/postAnswerActions";
import { patchAnswerActions } from "../../actions/patchAnswerActions";
import Report from "../../components/Report/Report";
import NewFIB from "../FillInTheBlanks/newFIB";
import NewSubjective from "../Subjective/newSubjective";
import VideoTest from "../video/videoTest";
import NewCoding from "../coding/newCoding";
import NewDatabase from "../Database/newDatabase";

const {
  ROUTE: { SWITCH_PATH },
} = constants;

const TestSwitch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { slug, id } = useParams();
  // Types
  type Option = "CUSTOM_INPUT" | "ALL_TEST_CASES";
  // Selectors
  const testDetails = useSelector(getTest);
  const solutionSet = useSelector(getSolutionSetSelector);
  const allQuestions = useSelector(getQuestionsSelector);
  const getIdentityDetails: any = useSelector(getIdentity);
  const SingleSolution = useSelector(getSingleSolState);
  const solutionDetails = useSelector(getSingleChoiceSolState);
  const getAnswerPostData = useSelector(getAnswerPostDataSelector);
  const patchStatus = useSelector(getPatchAnswerDataSelector);
  const getDelete = useSelector(getDeleteSelector);
  // State
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [currentAnswer, setCurrentAnswer] = useState<any>(null);
  const [currentAnswerExist, setCurrentAnswerExist] = useState<boolean>(false);
  const [problemName, setProblemName] = useState<string>("");
  const [lastSave, setLastSave] = useState<string>("No Data");
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showLoader, setLoader] = useState<boolean>(true);
  const [disableActions, setActionsDisable] = useState<boolean>(false);
  const [showReportPopup, reportPopupToggle] = useState<boolean>(false);
  // Values
  const { usertype, user_id, username } = getIdentityDetails;

  // console.log(testDetails?.name, "testttttttt");

  // Hooks
  useEffect(() => {
    if (testDetails.id) {
      setProblemName(testDetails.name);
      dispatch(fetchSolutionSetRequest(testDetails.id));
    }
  }, [testDetails, dispatch]);

  useEffect(() => {
    if (solutionSet) {
      setSolvedIds(getAllSolvedIds(solutionSet));
    }
  }, [solutionSet]);

  useEffect(() => {
    if (solutionSet && solutionSet.sections) {
      if (!testDetails?.is_timed_section) {
        const problemIds =
          solutionSet &&
          solutionSet?.sections?.map((item: any) => item.problem_ids);
        dispatch(questionsActions(testDetails.id, problemIds));
      } else {
        const problemIds = solutionSet.sections?.find(
          (val: any) => val.status === "CTK" || val.status === ""
        );
        dispatch(questionsActions(testDetails.id, problemIds?.problem_ids));
      }
    }
  }, [dispatch, solutionSet, testDetails]);

  useEffect(() => {
    if (allQuestions && allQuestions.length > 0) {
      const currentQuestion = allQuestions.find(
        (question: any) => question.slug === id
      );
      if (currentQuestion) {
        setCurrentQuestion(currentQuestion);
        setLoader(false);
      }
    }
  }, [allQuestions, id]);

  useEffect(() => {
    if (testDetails.slug && username && user_id && usertype && id) {
      setLoader(true);
    }
  }, [id, testDetails.slug, user_id, username, usertype]);

  useEffect(() => {
    if (solutionDetails === 404) {
      setCurrentAnswerExist(false);
      setCurrentAnswer(null);
      setActionsDisable(false);
    } else if (SingleSolution) {
      setCurrentAnswerExist(true);
      setCurrentAnswer(SingleSolution);
      setActionsDisable(false);
      if (getAnswerPostData) {
        setLastSave(getAnswerPostData?.modified);
        setActionsDisable(false);
      }
    }
  }, [SingleSolution, solutionDetails, getAnswerPostData]);

  // -- Notification on success post & patch request -- //
  useEffect(() => {
    if (
      patchStatus?.statusCode === 202 ||
      getAnswerPostData?.statusCode === 201
    ) {
      notification.open({
        message: (
          <div className={global_styles.solution_saved_loader}>
            Solution saved!
            <img alt="success" src={tick} />
          </div>
        ),
        duration: 2,
      });
    }
  }, [getAnswerPostData, patchStatus]);
  useEffect(() => {
    if (testDetails.slug && username && user_id && usertype !== undefined) {
      // console.log(getIdentityDetails);
      dispatch(fetchSolutionSetRequest(testDetails.id));
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
    getAnswerPostData,
    patchStatus,
    testDetails,
    usertype,
    user_id,
    username,
    id,
    getDelete,
    getIdentityDetails,
  ]);

  const saveAnswer = (answer: any) => {
    setActionsDisable(true);
    if (currentAnswerExist) {
      const patchReqParams = SingleSolution?.slug;
      dispatch(patchAnswerActions(patchReqParams, username, answer));
    } else {
      dispatch(postAnswerAction(username, answer));
    }
  };
  const clearAnswer = (type: any, tag_id: any) => {
    if (type === "FIB") {
      Array.from(document.getElementsByClassName(`${tag_id}`)).forEach(
        (el: any) => (el.value = "")
      );
      setActionsDisable(true);
      dispatch(
        deleteAnswerAction(SingleSolution?.slug, username, {
          id: SingleSolution?.slug,
        })
      );
    }
    if (currentAnswerExist) {
      setActionsDisable(true);
      dispatch(
        deleteAnswerAction(SingleSolution?.slug, username, {
          id: SingleSolution?.slug,
        })
      );
    }
  };
  const reportHandler = (option: any) => {};

  const toggleReportHandler = () => {
    reportPopupToggle(!showReportPopup);
  };
  const changePage = (_slug: string) => {
    if (_slug && slug && allQuestions) {
      setCurrentAnswer(null);
      setCurrentAnswerExist(false);
      navigate(SWITCH_PATH.replace(":slug", slug).replace(":id", _slug));
      const index = allQuestions.findIndex(
        (question: any) => question.slug === _slug
      );
      setCurrentPage(index + 1);
    }
  };
  const nextPage = () => {
    const index = allQuestions.findIndex(
      (question: any) => question.slug === id
    );
    if (allQuestions.length > index + 1) {
      changePage(allQuestions[index + 1].slug);
    }
  };
  const prevPage = () => {
    const index = allQuestions.findIndex(
      (question: any) => question.slug === id
    );
    if (index > 0) {
      changePage(allQuestions[index - 1].slug);
    }
  };

  const findCurrentQuestionIndex =
    allQuestions &&
    allQuestions?.findIndex((data: any) => data.slug === id) + 1;

  const runCode = (option: Option) => {};

  const loader = <img alt="Loading" className={styles.loader} src={Loader} />;

  const getContent = () => {
    switch (currentQuestion?.problem_type) {
      case "MCQ":
        return (
          <NewMcq
            clearHandler={clearAnswer}
            reportHandler={reportHandler}
            solutionDetails={solutionDetails}
            currentQuestion={currentQuestion}
            currentPage={findCurrentQuestionIndex}
            saveAnswer={saveAnswer}
            currentAnswerExist={currentAnswerExist}
            username={username}
            currentAnswer={currentAnswer}
            id={id}
            slug={testDetails.slug}
            solutionSetId={solutionSet.id}
            actionDisable={disableActions}
            toggleReportHandler={toggleReportHandler}
          />
        );

      case "SUB":
        return (
          <NewSubjective
            clearHandler={clearAnswer}
            reportHandler={reportHandler}
            solutionDetails={solutionDetails}
            currentQuestion={currentQuestion}
            currentPage={findCurrentQuestionIndex}
            nextPage={nextPage}
            saveAnswer={saveAnswer}
            currentAnswerExist={currentAnswerExist}
            username={username}
            currentAnswer={currentAnswer}
            id={id}
            slug={testDetails.slug}
            solutionSetId={solutionSet.id}
            actionDisable={disableActions}
            toggleReportHandler={toggleReportHandler}
          />
        );
      case "FIB":
        return (
          <NewFIB
            clearHandler={clearAnswer}
            reportHandler={reportHandler}
            solutionDetails={solutionDetails}
            currentQuestion={currentQuestion}
            currentPage={findCurrentQuestionIndex}
            nextPage={nextPage}
            saveAnswer={saveAnswer}
            currentAnswerExist={currentAnswerExist}
            username={username}
            currentAnswer={currentAnswer}
            id={id}
            slug={testDetails.slug}
            solutionSetId={solutionSet.id}
            actionDisable={disableActions}
            toggleReportHandler={toggleReportHandler}
          />
        );
      case "SCR":
      case "DBA":
      case "MLI":
      case "SEL":
      case "DSC":
        return (
          <NewCoding
            clearHandler={clearAnswer}
            reportHandler={reportHandler}
            solutionDetails={solutionDetails}
            currentQuestion={currentQuestion}
            currentPage={findCurrentQuestionIndex}
            saveAnswer={saveAnswer}
            nextPage={nextPage}
            currentAnswerExist={currentAnswerExist}
            username={username}
            currentAnswer={currentAnswer}
            id={id}
            slug={testDetails.slug}
            solutionSetId={solutionSet.id}
            actionDisable={disableActions}
            toggleReportHandler={toggleReportHandler}
            testName={testDetails?.name}
          />
          // <Coding />
        );

      case "VID":
        return (
          <VideoTest
            SingleSolution
            allQuestions
            testDetails
            solutionSet
            saveAnswer={saveAnswer}
          />
        );
    }
  };
  // console.log(getAnswerPostData);
  return (
    <div className={styles.container}>
      {currentQuestion?.problem_type !== "SCR" &&
      currentQuestion?.problem_type !== "DBA" &&
      currentQuestion?.problem_type !== "SEL" &&
      currentQuestion?.problem_type !== "MLI" &&
      currentQuestion?.problem_type !== "DSC" ? (
        <div className={styles.header}>
          <QuestionTypeHeader
            lastSave={lastSave}
            type={problemName}
            title={currentAnswer ? "ATTEMPTED" : "UNSOLVED"}
          />
        </div>
      ) : null}
      <div className={styles.body}>{getContent()}</div>

      <div className={styles.footer}>
        <TestPagination
          filterQuestions={allQuestions}
          singleProblem={currentQuestion}
          solved={solvedIds}
          callBack={changePage}
          currentPage={currentPage}
          nextPage={nextPage}
          prevPage={prevPage}
        />
      </div>
      <Report
        showModal={showReportPopup}
        reportData={{
          problem_slug: id,
          test_slug: testDetails?.slug,
          platform: "PLT",
          username: username,
        }}
        closeModal={() => reportPopupToggle(false)}
      />
      {showLoader && (
        <div className={styles.loader_wrapper}>
          <Spin spinning={true} indicator={loader}></Spin>
        </div>
      )}
    </div>
  );
};

export default TestSwitch;
