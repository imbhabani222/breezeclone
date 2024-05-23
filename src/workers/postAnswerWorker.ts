import { call, put } from "redux-saga/effects";

import {
  postAnswerAction,
  postAnswerSuccess,
  postAnswerFailure,
} from "../actions/postAnswerActions";
import constants from "../constants/constants";
import { FetchWithCaching } from "../utils/fetch-with-caching";

export default function* postAnswerRequest({
  username,
  payload,
}: ReturnType<typeof postAnswerAction>): any {
  try {
    const _response = yield call<any>(
      FetchWithCaching.fetchApi,
      `/api/v1/solution?__env=PLT&__user=${username}`,
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
      postAnswerSuccess({
        data: {
          data: data,
          statusCode: status,
        },
      })
    );
  } catch (e: any) {
    yield put(
      postAnswerFailure({
        payload: { error: (e as Error).message, statusCode: e.status },
      })
    );
  }
}
