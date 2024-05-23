import { combineReducers } from "redux";

import {
  getIdentity,
  getTestDetails,
  getTechnologyDetails,
} from "./reducers/assessmentReducer";
import { getSystemActionData } from "./reducers/systemActionsReducers";
import { combineInitAndStart } from "./reducers/initTestReducer";
import { combineReducer } from "./reducers/candidateTypeReducer";
import getServerTimeReducer from "./reducers/serverTimeReducer";
import checkSingleProblemSol from "./reducers/checkSinglePrbSol";
import { problemsReducer } from "./reducers/problemReducer";
import { combineQuestionsReducer } from "./reducers/questionsReducer";
import { checkAction, customResult, testCasesResult } from "./utils/reducers";
import { patchAnswerReducer } from "./reducers/patchAnswerReducer";

import {
  languageReducer,
  runCodeCustomReducer,
  postSolutionsSubmitReducer,
} from "./reducers/codingReducer";

import postFeedbackReducer from "./reducers/feedbackReducer";
import { combinePostAnswerReducer } from "./reducers/postAnswerReducer";

import reportIssueReducer from "./reducers/reportReducer";
import { createProctor } from "./reducers/createProctorReducer";
import { createIdentity } from "./reducers/createIdentityReducer";
import { fetchIdentityImg } from "./reducers/fetchIdentityImgReducer";
import uploadReducer from "./reducers/uploadReducer";
import { createVideoUrl } from "./reducers/createVideoReducer";

const rootReducer = combineReducers({
  systemActionsData: getSystemActionData,
  assessmentPage: getIdentity,
  technologies: getTechnologyDetails,
  candidateDetails: combineReducer,
  testDetails: getTestDetails,
  initTestDetails: combineInitAndStart,
  submitSection: getServerTimeReducer,
  problem: problemsReducer,
  checkSingleProblemSol: checkSingleProblemSol,
  questions: combineQuestionsReducer,
  systemAction: checkAction,
  patchAnswer: patchAnswerReducer,
  postAnswer: combinePostAnswerReducer,
  postFeedback: postFeedbackReducer,
  reportIssue: reportIssueReducer,
  createProctor: createProctor,
  identityImage: createIdentity,
  getIdentityImage: fetchIdentityImg,
  uploadAttachment: uploadReducer,
  language: languageReducer,
  runCodeCustom: runCodeCustomReducer,

  customResult: customResult,

  testResult: testCasesResult,

  postSolutionsSubmit: postSolutionsSubmitReducer,
  videoSignedUrl: createVideoUrl,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
