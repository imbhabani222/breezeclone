import actionTypes from "../constants/actionTypes";

import {
  FetchServerTimeRequest,
  FetchServerTimeFailure,
  FetchServerTimeFailurePayload,
  FetchServerTimeSuccess,
  FetchServerTimeSuccessPayload
} from "../types/getServerTimeTypes";

export const fetchGetServerTimeRequest = (): FetchServerTimeRequest => ({
  type: actionTypes.FETCH_SERVER_TIME_REQUEST
});

export const fetchGetServerTimeSuccess = (
  payload: FetchServerTimeSuccessPayload
): FetchServerTimeSuccess => ({
  type: actionTypes.FETCH_SERVER_TIME_SUCCESS,
  payload
});

export const fetchGetServerTimeFailure = (
  payload: FetchServerTimeFailurePayload
): FetchServerTimeFailure => ({
  type: actionTypes.FETCH_SERVER_TIME_FAILURE,
  payload
});
