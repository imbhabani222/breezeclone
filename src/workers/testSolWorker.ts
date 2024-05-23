import { call, put } from "redux-saga/effects";
import { FetchWithCaching } from "../utils/fetch-with-caching";

import {
  fetchTestSolActions,
  fetchTestSolActionsSuccess,
  fetchTestSolActionsFailure,
} from "../actions/testSolActions";
import constants from "../constants/constants";

export function* fetchTestSol({
  usertype,
  user_id,
  slug,
  platform,
  username,
}: ReturnType<typeof fetchTestSolActions>): any {
  try {
    const response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/api/v1/${usertype}/${user_id}/solutionset?context=test&context_slug=${slug}&__env=${platform}&__user=${username}`,
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
      fetchTestSolActionsSuccess({
        data: {
          data: response.data,
          statusCode: status,
        },
      })
    );
  } catch (e: any) {
    yield put(
      fetchTestSolActionsFailure({
        error: e.status,
      })
    );
  }
}
