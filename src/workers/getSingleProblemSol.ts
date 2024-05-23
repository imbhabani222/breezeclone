import axios from "axios";
import { call, put } from "redux-saga/effects";

import {
  getSingleProblemSolFailure,
  getSingleProblemSolSuccess,
  getSingleProblemSolAction,
} from "../actions/questionsAction";

import { FetchWithCaching } from "../utils/fetch-with-caching";
import constants from "../constants/constants";

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export function* getsingleProblemSolution({
  userType,
  user_id,
  platform,
  username,
  context_slug,
  problem_slug,
}: ReturnType<typeof getSingleProblemSolAction>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/api/v1/${userType}/${user_id}/solution?__env=${platform}&__user=${username}&context=test&context_slug=${context_slug}&problem_slug=${problem_slug}`,
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
      getSingleProblemSolSuccess({
        data: data,
        statusCode: status,
      })
    );
  } catch (e: any) {
    yield put(
      getSingleProblemSolFailure({
        error: (e as Error).message,
        statusCode: e,
      })
    );
  }
}
