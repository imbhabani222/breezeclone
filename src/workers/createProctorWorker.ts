import { call, put } from "redux-saga/effects";

import {
  createProctorAction,
  createProctorSuccess,
  createProctorFailure,
} from "../actions/createProctorActions";
import constants from "../constants/constants";
import { FetchWithCaching } from "../utils/fetch-with-caching";

export default function* postQuestionsRequest({
  assessmentType,
  assessmentId,
}: ReturnType<typeof createProctorAction>): any {
  try {
    const _response = yield call(
      FetchWithCaching.fetchApi,
      `/rpc/proctorv2/settings/create/${assessmentType}/${assessmentId}

      `,
      {},
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
      createProctorSuccess({
        payload: {
          data: data,
          statusCode: status,
        },
      })
    );
  } catch (e: any) {
    yield put(
      createProctorFailure({
        payload: { error: (e as Error).message, statusCode: e.status },
      })
    );
  }
}
