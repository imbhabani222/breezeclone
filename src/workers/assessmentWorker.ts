import { call, put } from "redux-saga/effects";

import {
  fetchIdentityActionsSuccess,
  fetchIdentityActionsFailure,
  fetchAssesmentDetailsSuccess,
  fetchAssessmentDetails,
  fetchAssessmentFailure,
  fetchTechnologiesDetails,
  fetchTechnologiesDetailsSuccess,
  fetchTechnologiesDetailsFailure,
} from "../actions/assessmentActions";
import constants from "../constants/constants";
import { FetchWithCaching } from "../utils/fetch-with-caching";

export function* fetchIdentity(): any {
  try {
    const response = yield call<any>(
      FetchWithCaching.fetchApi,
      "/gateways/identity",
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
      fetchIdentityActionsSuccess({
        identity: response,
      })
    );
  } catch (e) {
    yield put(
      fetchIdentityActionsFailure({
        error: (e as Error).message,
      })
    );
  }
}

export function* fetchAssesmentDetils({
  slug,
  username,
}: ReturnType<typeof fetchAssessmentDetails>): any {
  try {
    const response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/api/v1/test/${slug}`,
      { __user: username, __env: "<platform_type>" },
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
      fetchAssesmentDetailsSuccess({
        details: response,
        status: response.status,
      })
    );
  } catch (err) {
    fetchAssessmentFailure({
      err,
    });
  }
}

export function* fetchTechnologies(): any {
  try {
    const response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/rpc/get_technologies`,
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
      fetchTechnologiesDetailsSuccess({
        details: response,
        status: response.status,
      })
    );
  } catch (err) {
    fetchTechnologiesDetailsFailure({
      err,
    });
  }
}
