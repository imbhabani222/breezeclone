import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import styles from "../views/testInstructionPages/testQuestionsPage/testQuestions.module.scss";

import constants from "../constants/constants";
import MCQ from "../views/MCQPage/MCQ";
import { useDispatch, useSelector } from "react-redux";
import {
  getIdentity,
  getSingleSolState,
  getSingleSolStatePending,
  getTest,
} from "../selectors/selectors";
import {
  questionsActions,
  getSingleProblemSolAction,
} from "../actions/questionsAction";
import FillInTheBlanks from "../views/FillInTheBlanks/FillInTheBlanks";
import {
  getPendingQuestionsSelector,
  getProblemSelector,
  getSolutionSetSelector,
} from "../selectors/problemSelector";
import { getQuestionsSelector } from "../selectors/questionsSelector";
import {
  fetchProblemRequest,
  fetchSolutionSetRequest,
} from "../actions/problemActions";
import RichTextEditor from "../views/Subjective/subjective";
import DisableCopyPaste from "../components/disableCopyPaste/disableContainer";
import Coding from "../views/coding/coding";
import VideoTest from "../views/video/videoTest";

const {
  ROUTE: { MCQ_PAGE, FIll_IN_BLANKS },
} = constants;

let slug = window.location.pathname.split("/")[2];

const SwitchPath = () => {
  const solutionMcq = useSelector(getSingleSolState);
  const getSingleSolDetails: any = useSelector(getIdentity);
  const testDetails = useSelector(getTest);
  let { id } = useParams();
  const { usertype, user_id, username } = getSingleSolDetails;
  const solutionSet = useSelector(getSolutionSetSelector);
  const mcqRequestPending = useSelector(getPendingQuestionsSelector);
  const allMcq = useSelector(getQuestionsSelector);
  const solutionMcqPending = useSelector(getSingleSolStatePending);
  const getAllProblems = useSelector(getProblemSelector);
  const dispatch = useDispatch();

  const proctorData = {
    proctor: testDetails?.settings?.proctor.enabled,
    videoProctor: testDetails?.settings?.proctor.video.enabled,
    imageProctor: testDetails?.settings?.proctor.snapshot,
  };
  let disableCopyPasteStatus =
    proctorData.proctor || proctorData.videoProctor || proctorData.imageProctor;
  useEffect(() => {
    if (solutionSet === "") {
      dispatch(fetchSolutionSetRequest(testDetails.id));
    }
  }, [dispatch, testDetails, solutionSet, allMcq]);

  // useEffect(() => {
  //   if (solutionSet !== "" && !mcqRequestPending && !allMcq) {
  //     const problemIds =
  //       solutionSet &&
  //       solutionSet?.sections?.map((item: any) => item.problem_ids);
  //     // dispatch(questionsActions(testDetails.id, problemIds));
  //   }
  //   if (!solutionMcq || (solutionMcq && solutionMcq.problem.slug !== id)) {
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
  //   }
  // }, [
  //   dispatch,
  //   solutionSet,
  //   testDetails.id,
  //   testDetails.slug,
  //   allMcq,
  //   mcqRequestPending,
  //   usertype,
  //   user_id,
  //   username,
  //   id,
  //   solutionMcq,
  // ]);

  // useEffect(() => {
  //   dispatch(
  //     getSingleProblemSolAction(
  //       usertype,
  //       user_id,
  //       "PLT",
  //       username,
  //       testDetails.slug,
  //       id
  //     )
  //   );
  // }, [dispatch, usertype, user_id, username, testDetails.slug, id]);
  useEffect(() => {
    dispatch(fetchProblemRequest(testDetails?.id));
  }, [dispatch, testDetails?.id]);
  const getContent = () => {
    let findQuesType = allMcq && allMcq?.find((data: any) => data.slug === id);
    let findFromSection =
      getAllProblems &&
      getAllProblems?.filter((data: any) =>
        data.problems.find((data: any) => data.slug === id)
      );
    let getSctionType =
      findFromSection &&
      findFromSection?.map((data: any) =>
        data.problems.find((data: any) => data.slug === id)
      );
    switch (
      findQuesType?.problem_type || getSctionType.length > 0
        ? getSctionType[0].problem_type
        : ""
    ) {
      case "MCQ":
        return <MCQ />;
      case "FIB":
        return <FillInTheBlanks />;
      case "SUB":
        return <RichTextEditor />;
      case "SCR":
        return <Coding />;
      case "VID":
        return <VideoTest />;
    }
  };

  return (
    <>
      {disableCopyPasteStatus ? (
        <DisableCopyPaste>{getContent()}/</DisableCopyPaste>
      ) : (
        getContent()
      )}
    </>
  );
};
export default SwitchPath;
