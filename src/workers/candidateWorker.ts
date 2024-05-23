import { call, put } from "redux-saga/effects";
import { FetchWithCaching } from "../utils/fetch-with-caching";

import {
  fetchHackerActions,
  fetchHackerActionsSuccess,
  fetchHackerActionsFailure,
  fetchRecruiterActionsSuccess,
  fetchRecruiterActions,
  fetchRecruiterActionsFailure,
  fetchUserTypeActions,
  fetchUserTypeActionsSuccess,
  fetchUserTypeActionsFailure,
} from "../actions/candidateActions";
import constants from "../constants/constants";

export function* fetchHacker({
  user_id,
  username,
}: ReturnType<typeof fetchHackerActions>): any {
  try {
    const response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/api/v1/hacker/${user_id}?__env=PLT&__user=${username}`,
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
      fetchHackerActionsSuccess({
        data: { data: response },
      })
    );
  } catch (e) {
    yield put(
      fetchHackerActionsFailure({
        error: (e as Error).message,
      })
    );
  }
}

export function* fetchRecruiter({
  user_id,
  username,
}: ReturnType<typeof fetchRecruiterActions>): any {
  try {
    const response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/api/v1/recruiter/${user_id}?__env=PLT&__user=${username}`,
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
    yield put(
      fetchRecruiterActionsSuccess({
        data: response,
      })
    );
  } catch (e) {
    yield put(
      fetchRecruiterActionsFailure({
        error: (e as Error).message,
      })
    );
  }
}

export function* fetchUserType({
  user_type,
  user_id,
  username,
}: ReturnType<typeof fetchUserTypeActions>): any {
  try {
    const response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/api/v1/${user_type}/${user_id}?__env=PLT&__user=${username}`,
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
    yield put(
      fetchUserTypeActionsSuccess({
        data: response,
      })
    );
  } catch (e) {
    yield put(
      fetchUserTypeActionsFailure({
        error: (e as Error).message,
      })
    );
  }
}
