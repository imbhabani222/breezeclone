import axios from "axios";
import { call, put } from "redux-saga/effects";

import { fetchTodoFailure, fetchTodoSuccess } from "../actions/actions";
import {
  fetchGetServerTimeSuccess,
  fetchGetServerTimeFailure,
} from "../actions/getServerActions";

import {
  fetchProblemSuccess,
  fetchProblemFailure,
  fetchProblemRequest,
  finishTestRequest,
  finishTestSuccess,
  finishTestFailure,
  fetchSolutionSetRequest,
  fetchSolutionSetSuccess,
  fetchSolutionSetFailure,
  postSectionRequest,
  postSectionSuccess,
  postSectionFailure,
} from "../actions/problemActions";

import {
  patchAnswerActions,
  patchAnswerActionsSuccess,
  patchAnswerActionsFailure,
} from "../actions/patchAnswerActions";

import {
  postFeedbackRequest,
  postFeedbackSuccess,
  postFeedbackFailure,
} from "../actions/feedbackActions";

import {
  fetchQuestionsFailure,
  questionsActions,
  fetchQuestionsSuccess,
  deleteAnswerAction,
  deleteAnswerActionSuccess,
  deleteAnswerActionFailure,
} from "../actions/questionsAction";
import { ITodo } from "../types/types";
import { FetchWithCaching } from "../utils/fetch-with-caching";
import constants from "../constants/constants";
import Cookies from "universal-cookie";

import {
  postReportIssueFailure,
  postReportIssueRequest,
  postReportIssueSuccess,
} from "../actions/reportActions";
import {
  postUploadAttchmentFailure,
  postUploadAttchmentRequest,
  postUploadAttchmentSuccess,
} from "../actions/uploadAction";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

const getTodos = () =>
  axios.get<ITodo[]>("https://jsonplaceholder.typicode.com/todos");

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/
export function* fetchTodo(): any {
  try {
    const response = yield call(getTodos);
    yield put(
      fetchTodoSuccess({
        todos: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchTodoFailure({
        error: (e as Error).message,
      })
    );
  }
}

export function* fetchServerTime(): any {
  try {
    const response = yield call<any>(
      FetchWithCaching.fetchApi,
      "/rpc/get_server_time",
      {},
      "GET",
      constants.HTTP_REQ_DEFAULT_HEADERS,
      true,
      true,
      30 * 60000,
      false,
      true,
      true
    );
    yield put(
      fetchGetServerTimeSuccess({
        serverTime: response,
      })
    );
  } catch (e) {
    yield put(
      fetchGetServerTimeFailure({
        error: (e as Error).message,
      })
    );
  }
}

// Get All Test Problems Names (Questions Page)
export function* fetchProblems({
  problem_id,
}: ReturnType<typeof fetchProblemRequest>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/api.v2/assessment/${problem_id}/sectionwise/problems`,
      {},
      "GET",
      constants.HTTP_REQ_DEFAULT_HEADERS,
      true,
      false,
      30 * 60000,
      false,
      true,
      false,
      true
    );
    const { status, data } = _response;
    yield put(
      fetchProblemSuccess({
        allProblems: data,
      })
    );
  } catch (e) {
    yield put(
      fetchProblemFailure({
        error: (e as Error).message,
      })
    );
  }
}

// GET SOLUTION SET
export function* fetchSolutionSet({
  problem_id,
}: ReturnType<typeof fetchSolutionSetRequest>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/api.v2/assessment/${problem_id}/solutionset`,
      {},
      "GET",
      constants.HTTP_REQ_DEFAULT_HEADERS,
      true,
      false,
      30 * 60000,
      false,
      true,
      false,
      true
    );
    const { status, data } = _response;

    yield put(
      fetchSolutionSetSuccess({
        allProblems: data,
        statusCode: status,
      })
    );
  } catch (e: any) {
    yield put(
      fetchSolutionSetFailure({
        error: (e as Error).message,
        statusCode: e.status,
      })
    );
  }
}

// Get All MCQs Questions with options data
export function* fetchQuestionsRequest({
  ids,
  problem_id,
}: ReturnType<typeof questionsActions>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/api.v2/assessment/${problem_id}/problems?ids=${ids}`,
      {},
      "GET",
      constants.HTTP_REQ_DEFAULT_HEADERS,
      true,
      false,
      30 * 60000,
      false,
      true,
      false,
      true
    );
    const { status, data } = _response;

    yield put(
      fetchQuestionsSuccess({
        singleProblem: data,
      })
    );
  } catch (e) {
    yield put(
      fetchQuestionsFailure({
        error: (e as Error).message,
      })
    );
  }
}

// POST FEEDBACK API
export function* postFeedback({
  userName,
  payload,
}: ReturnType<typeof postFeedbackRequest>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/rpc/feedback.collect?__env=PLT&__user=${userName}`,
      payload,
      "POST",
      constants.HTTP_REQ_DEFAULT_HEADERS,
      true,
      false,
      30 * 60000,
      false,
      true,
      false,
      true
    );
    const { status, data } = _response;

    yield put(
      postFeedbackSuccess({
        data: data,
      })
    );
  } catch (e: any) {
    yield put(
      postFeedbackFailure({
        error: e?.response?.status,
        statusCode: e?.response?.status,
      })
    );
  }
}

// REPORT AN ISSUE API
export function* postReportIssue({
  platform,
  userName,
  payload,
}: ReturnType<typeof postReportIssueRequest>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/rpc/report_issue?__env=${platform}&__user=${userName}`,
      payload,
      "POST",
      constants.HTTP_REQ_DEFAULT_HEADERS,
      true,
      false,
      30 * 60000,
      false,
      true,
      false,
      true
    );
    const { status, data } = _response;

    yield put(
      postReportIssueSuccess({
        data: data,
      })
    );
  } catch (e: any) {
    yield put(
      postReportIssueFailure({
        error: e?.response?.status,
        statusCode: e?.response?.status,
      })
    );
  }
}

// DELETE MCQ OPTIONS/ANSWER
export function* deleteAnswer({
  delete_id,
  userName,
  payload,
}: ReturnType<typeof deleteAnswerAction>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/api/v1/solution/${delete_id}?__env=PLT&__user=${userName}`,
      {
        data: {
          ...payload,
        },
      },
      "DELETE",
      constants.HTTP_REQ_DEFAULT_HEADERS,
      true,
      false,
      30 * 60000,
      false,
      true,
      false,
      true
    );
    const { status, data } = _response;

    yield put(
      deleteAnswerActionSuccess({
        data: {
          data: data,
          status: status,
        },
      })
    );
  } catch (e: any) {
    yield put(
      deleteAnswerActionFailure({
        error: e.status,
        statusCode: e.status,
      })
    );
  }
}
// PATCH ANSWER

export function* patchAnswerRequest({
  patchId,
  username,
  patchPayload,
}: ReturnType<typeof patchAnswerActions>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `api/v1/solution/${patchId}?__env=PLT&__user=${username}`,
      {
        ...patchPayload,
      },
      "PATCH",
      constants.HTTP_REQ_DEFAULT_HEADERS,
      true,
      false,
      30 * 60000,
      false,
      true,
      false,
      true
    );
    const { status, data } = _response;

    yield put(
      patchAnswerActionsSuccess({
        data: {
          data: data,
          statusCode: status,
        },
      })
    );
  } catch (e: any) {
    yield put(
      patchAnswerActionsFailure({
        error: (e as Error).message,
        statusCode: e?.response?.status,
      })
    );
  }
}

// SUBMIT THE TEST
export function* finishTest({
  test_id,
  username,
}: ReturnType<typeof finishTestRequest>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/rpc/test.submit_all/${test_id}?__env=PLT&__user=${username}`,
      {
        submission_type: "MSB",
      },
      "POST",
      constants.HTTP_REQ_DEFAULT_HEADERS,
      true,
      false,
      30 * 60000,
      false,
      true,
      false,
      true
    );
    const { status, data } = _response;
    yield put(
      finishTestSuccess({
        data: data,
      })
    );
  } catch (e: any) {
    yield put(
      finishTestFailure({
        error: e.response.status,
        statusCode: e.response.status,
      })
    );
  }
}

// Upload file Attachment API
export function* postUploadAttchment({
  platform,
  userName,
  payload,
}: ReturnType<typeof postUploadAttchmentRequest>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/rpc/upload?__env=${platform}&__user=${userName}`,
      payload,
      "POST",
      constants.HTTP_REQ_DEFAULT_HEADERS,
      true,
      false,
      30 * 60000,
      false,
      true,
      false,
      true
    );
    const { status, data } = _response;

    yield put(
      postUploadAttchmentSuccess({
        data: data,
      })
    );
  } catch (e: any) {
    yield put(
      postUploadAttchmentFailure({
        error: e?.response?.status,
        statusCode: e?.response?.status,
      })
    );
  }
}

// submit section API
export function* postSubmitSection({
  platform,
  userName,
  payload,
}: ReturnType<typeof postSectionRequest>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/rpc/test.submit_section?__env=${platform}&__user=${userName}`,
      payload,
      "POST",
      constants.HTTP_REQ_DEFAULT_HEADERS,
      true,
      false,
      30 * 60000,
      false,
      true,
      false,
      true
    );
    const { status, data } = _response;

    yield put(
      postSectionSuccess({
        data: data,
      })
    );
  } catch (e: any) {
    yield put(
      postSectionFailure({
        error: e?.response?.status,
        statusCode: e?.response?.status,
      })
    );
  }
}

// https://central.dev.sg1.chsh.in/rpc/upload?__env=PLT&__user=abhishek_patil_hutech
// https://central.dev.sg1.chsh.in/rpc/test.submit_section?__env=PLT&__user=abhishek_patil_hutech
