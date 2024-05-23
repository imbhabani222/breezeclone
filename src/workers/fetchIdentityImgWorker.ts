import { call, put } from "redux-saga/effects";
import { FetchWithCaching } from "../utils/fetch-with-caching";

import {
  fetchIdentityImgAction,
  fetchIdentityImgSuccess,
  fetchIdentityImgFailure,
} from "../actions/fetchIdentityImgActions";
import constants from "../constants/constants";

export function* fetchIdentityImg({
  assessmentType,
  assessmentId,
}: ReturnType<typeof fetchIdentityImgAction>): any {
  try {
    const response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/rpc/proctorv2/identity/fetch/${assessmentType}/${assessmentId}
        `,
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
    const { status, data } = response;
    yield put(
      fetchIdentityImgSuccess({
        payload: {
          data: status,
        },
      })
    );
  } catch (e: any) {
    yield put(
      fetchIdentityImgFailure({
        payload: { error: (e as Error).message, statusCode: e.status },
      })
    );
  }
}
