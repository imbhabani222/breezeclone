import { all, takeLatest } from "redux-saga/effects";

import actionTypes from "../constants/actionTypes/assessmentActionsTypes";
import patchActionTypes from "../constants/actionTypes";
import createProctorActionTypes from "../constants/actionTypes/createProctorActionsTypes";
import createVideoActionTypes from "../constants/actionTypes/createVideoActionTypes";
import createIdentityActionTypes from "../constants/actionTypes/createIdentityActionsTypes";
import solTestactionTypes from "../constants/actionTypes/testSoulutionSetTypes";
import initActionsType from "../constants/actionTypes/initTestActionsTypes";
import identityImg from "../constants/actionTypes/fetchIdentityActionsTypes";
import postAnswerActionsType from "../constants/actionTypes/postAnswerActionsTypes";
import * as worker from "../workers/assessmentWorker";
import actionTypesCandidate from "../constants/actionTypes/typeHackerRecruiter";
import * as candidateType from "../workers/candidateWorker";
import { fetchTestSol } from "../workers/testSolWorker";
import { getsingleProblemSolution } from "../workers/getSingleProblemSol";
import { fetchInitTest, fetchStartTest } from "../workers/initTestWorker";
import postQuestionsRequest from "../workers/postAnswerWorker";
import createProctorRequest from "../workers/createProctorWorker";
import createIdentityRequest from "../workers/createIdentityWorker";
import putVideoImage from "../workers/createVideo";

import {
  fetchLanguageStubApi,
  postrunCodeWithCustomInput,
  postSolutionsSubmit,
} from "../workers/codingWorker";
import { fetchIdentityImg } from "../workers/fetchIdentityImgWorker";

import actionTypesAll from "../constants/actionTypes";

import * as allworker from "../workers/workers";

export function* fetchIdentity() {
  yield all([takeLatest(actionTypes.FETCH_IDENTITY, worker.fetchIdentity)]);
}
export function* fetchTestDetails() {
  yield all([
    takeLatest(actionTypes.TEST_DETAILS_REQUEST, worker.fetchAssesmentDetils),
  ]);
}

export function* fetchTechnologyDetails() {
  yield all([
    takeLatest(
      actionTypes.TECHNOLOGY_DETAILS_REQUEST,
      worker.fetchTechnologies
    ),
  ]);
}

export function* fetchCandidateDetails() {
  yield all([
    takeLatest(actionTypesCandidate.FETCH_HACKER, candidateType.fetchHacker),
  ]);
  yield all([
    takeLatest(
      actionTypesCandidate.FETCH_RECRUITER,
      candidateType.fetchRecruiter
    ),
  ]);
  yield all([
    takeLatest(
      actionTypesCandidate.FETCH_USER_TYPE,
      candidateType.fetchUserType
    ),
  ]);
}
export function* fetchTestSolDetails() {
  yield all([takeLatest(solTestactionTypes.FETCH_TEST_SOLUTION, fetchTestSol)]);
}
export function* fetchInitTestDetails() {
  yield all([takeLatest(initActionsType.FETCH_INIT_TEST, fetchInitTest)]);
  yield all([takeLatest(initActionsType.FETCH_START_TEST, fetchStartTest)]);
}

export function* fetchTodo() {
  yield all([
    takeLatest(actionTypesAll.FETCH_TODO_REQUEST, allworker.fetchTodo),
  ]);
}

export function* fetchServerTimes() {
  yield all([
    takeLatest(
      actionTypesAll.FETCH_SERVER_TIME_REQUEST,
      allworker.fetchServerTime
    ),
  ]);
}

export function* fetchProblems() {
  yield all([
    takeLatest(actionTypesAll.FETCH_PROBLEM_REQUEST, allworker.fetchProblems),
  ]);
}

export function* fetchCodeLanguages() {
  yield all([
    takeLatest(actionTypesAll.GET_LANGUAGE_REQUEST, fetchLanguageStubApi),
  ]);
}

export function* postRunCodeCustom() {
  yield all([
    takeLatest(
      actionTypesAll.RUN_CODE_CUSTOM_INPUT_REQUEST,
      postrunCodeWithCustomInput
    ),
  ]);
}

export function* postTestSolutionsSubmit() {
  yield all([
    takeLatest(actionTypesAll.TESTCASES_RUN_CODE__REQUEST, postSolutionsSubmit),
  ]);
}

export function* finishTest() {
  yield all([
    takeLatest(actionTypesAll.POST_TEST_REQUEST, allworker.finishTest),
  ]);
}

export function* fetchQuestionsRequest() {
  yield all([
    takeLatest(
      actionTypesAll.FETCH_QUESTIONS_REQUEST,
      allworker.fetchQuestionsRequest
    ),
  ]);
}

export function* getsingleMCQSendSol() {
  yield all([
    takeLatest(
      actionTypesAll.FETCH_SINGLE_PRB_SOL_REQUEST,
      getsingleProblemSolution
    ),
  ]);
}

export function* fetchFeedback() {
  yield all([
    takeLatest(actionTypesAll.POST_FEEDBACk_REQUEST, allworker.postFeedback),
  ]);
}

export function* postReportIssue() {
  yield all([
    takeLatest(
      actionTypesAll.POST_REPORT_ISSUE_REQUEST,
      allworker.postReportIssue
    ),
  ]);
}

export function* fetchSolutionSet() {
  yield all([
    takeLatest(
      actionTypesAll.FETCH_SOLUTIONSET_REQUEST,
      allworker.fetchSolutionSet
    ),
  ]);
}

export function* deleteAnswer() {
  yield all([
    takeLatest(actionTypesAll.DELETE_ANSWER_REQUEST, allworker.deleteAnswer),
  ]);
}
export function* patchAnswer() {
  yield all([
    takeLatest(
      patchActionTypes.PATCH_ANSWER_REQUEST,
      allworker.patchAnswerRequest
    ),
  ]);
}
export function* postQuestionsWatcher() {
  yield all([
    takeLatest(postAnswerActionsType.POST_ANSWER, postQuestionsRequest),
  ]);
}
export function* createProctor() {
  yield all([
    takeLatest(createProctorActionTypes.CREATE_PROCTOR, createProctorRequest),
  ]);
}
export function* createIdentity() {
  yield all([
    takeLatest(
      createIdentityActionTypes.CREATE_IDENTITY,
      createIdentityRequest
    ),
  ]);
}

export function* fetchIdentityImage() {
  yield all([takeLatest(identityImg.FETCH_IDENTITY_IMG, fetchIdentityImg)]);
}

export function* fetchUploadAttachement() {
  yield all([
    takeLatest(
      actionTypesAll.POST_UPLOAD_FILE_REQUEST,
      allworker.postUploadAttchment
    ),
  ]);
}

export function* fetchSection() {
  yield all([
    takeLatest(
      actionTypesAll.POST_SECTION_REQUEST,
      allworker.postSubmitSection
    ),
  ]);
}

export function* putVideoImg() {
  yield all([takeLatest(createVideoActionTypes.CREATE_VIDEO, putVideoImage)]);
}
// export function* patchFIB() {
//   yield all([takeLatest(actionTypesAll.PATCH_FIB_REQUEST, allworker.patchFIB)]);
// }

// export function* deleteFIB() {
//   yield all([
//     takeLatest(actionTypesAll.DELETE_FIB_REQUEST, allworker.deleteFIB),
//   ]);
// }
