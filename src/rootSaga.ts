import { all, fork } from "redux-saga/effects";
import {
  fetchIdentity,
  fetchTestDetails,
  fetchCandidateDetails,
  fetchTestSolDetails,
  fetchInitTestDetails,
  fetchTodo,
  fetchServerTimes,
  fetchProblems,
  fetchQuestionsRequest,
  finishTest,
  getsingleMCQSendSol,
  patchAnswer,
  deleteAnswer,
  fetchFeedback,
  fetchSolutionSet,
  postQuestionsWatcher,
  postReportIssue,
  createProctor,
  createIdentity,
  fetchIdentityImage,
  fetchUploadAttachement,
  fetchSection,
  fetchTechnologyDetails,
  fetchCodeLanguages,
  postRunCodeCustom,
  postTestSolutionsSubmit,
  putVideoImg,
} from "./watchers/watchers";

export function* rootSaga() {
  yield all([fork(fetchIdentity)]);
  yield all([fork(fetchTestDetails)]);
  yield all([fork(fetchTechnologyDetails)]);
  yield all([fork(fetchCandidateDetails)]);
  yield all([fork(fetchTestSolDetails)]);
  yield all([fork(fetchInitTestDetails)]);
  yield all([fork(fetchTodo)]);
  yield all([fork(fetchServerTimes)]);
  yield all([fork(fetchProblems)]);
  yield all([fork(fetchSolutionSet)]);
  yield all([fork(fetchQuestionsRequest)]);
  yield all([fork(finishTest)]);
  yield all([fork(getsingleMCQSendSol)]);
  yield all([fork(fetchFeedback)]);
  yield all([fork(deleteAnswer)]);
  yield all([fork(patchAnswer)]);
  yield all([fork(postQuestionsWatcher)]);
  yield all([fork(fetchSection)]);
  yield all([fork(postReportIssue)]);
  yield all([fork(createProctor)]);
  yield all([fork(createIdentity)]);
  yield all([fork(fetchIdentityImage)]);
  yield all([fork(fetchUploadAttachement)]);

  yield all([fork(fetchCodeLanguages)]);

  yield all([fork(postRunCodeCustom)]);

  yield all([fork(postTestSolutionsSubmit)]);
  yield all([fork(putVideoImg)]);
}
