import axios from "axios";
import { call, put } from "redux-saga/effects";
import Cookies from "universal-cookie";
import { FetchWithCaching } from "../utils/fetch-with-caching";

import {
  fetchInitTestActions,
  fetchInitTestActionsSuccess,
  fetchInitTestActionsFailure,
  fetchStartTestActions,
  fetchStartTestActionsSuccess,
  fetchStartTestActionsFailure,
} from "../actions/initTestActions";
import constants from "../constants/constants";

export function* fetchInitTest({
  test_id,
  username,
  payload,
}: ReturnType<typeof fetchInitTestActions>): any {
  try {
    const response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/rpc/test.init/${test_id}?__env=PLT&__user=${username}`,
      { ...payload },
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
    yield put(
      fetchInitTestActionsSuccess({
        data: {
          data: response.data,
          statusCode: response.status,
        },
      })
    );
  } catch (e: any) {
    yield put(
      fetchInitTestActionsFailure({
        error: e.status,
        statusCode: e.status,
      })
    );
  }
}

export function* fetchStartTest({
  test_id,
  username,
}: ReturnType<typeof fetchStartTestActions>): any {
  try {
    const response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/rpc/test.start/${test_id}?__env=PLT&__user=${username}`,
      {},
      "POST",
      constants.HTTP_REQ_DEFAULT_HEADERS,
      true,
      true,
      30 * 60000,
      false,
      true,
      true
    );
    yield put(
      fetchStartTestActionsSuccess({
        data: response,
      })
    );
  } catch (e: any) {
    yield put(
      fetchStartTestActionsFailure({
        error: e,
      })
    );
  }
}
