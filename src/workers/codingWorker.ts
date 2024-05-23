import axios from "axios";
import { call, put } from "redux-saga/effects";

import { ITodo } from "../types/types";
import { FetchWithCaching } from "../utils/fetch-with-caching";
import constants from "../constants/constants";
import Cookies from "universal-cookie";
import {
  fetchLanguageFailure,
  fetchLanguageRequest,
  fetchLanguageSuccess,
  runCodeWithCustomInputFailure,
  runCodeWithCustomInputRequest,
  runCodeWithCustomInputSuccess,
  postSolutionsSubmitRequest,
  postSolutionsSubmitSuccess,
  postSolutionsSubmitFailure,
} from "../actions/codingActions";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

/*
  Worker Saga: Fired on FETCH_TODO_REQUEST action
*/

// Get All Test Problems Names (Questions Page)
export function* fetchLanguageStubApi({
  language,
}: ReturnType<typeof fetchLanguageRequest>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/rpc/detail_provider?namespace=stub&q=${language}`,
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
      fetchLanguageSuccess({
        payload: {
          data: data,
        },
      })
    );
  } catch (e: any) {
    yield put(
      fetchLanguageFailure({
        payload: {
          error: e?.response?.status,
          statusCode: e?.response?.status,
        },
      })
    );
  }
}

export function* postrunCodeWithCustomInput({
  problemType,
  payload,
}: ReturnType<typeof runCodeWithCustomInputRequest>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/rpc/code.run?__source=TST&solution_type=${problemType}&verify=none`,
      {
        ...payload,
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
      runCodeWithCustomInputSuccess({
        data: {
          data: data,
          statusCode: status,
        },
      })
    );
  } catch (e: any) {
    yield put(
      runCodeWithCustomInputFailure({
        payload: { error: (e as Error).message, statusCode: e.status },
      })
    );
  }
}

export function* postSolutionsSubmit({
  payload,
  username,
}: ReturnType<typeof postSolutionsSubmitRequest>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `rpc/solutions.submit?__env=PLT&__source=TST&__user=${username}`,
      {
        ...payload,
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
      postSolutionsSubmitSuccess({
        data: {
          data: data,
          statusCode: status,
        },
      })
    );
  } catch (e: any) {
    yield put(
      postSolutionsSubmitFailure({
        payload: { error: (e as Error).message, statusCode: e.status },
      })
    );
  }
}
