import actionTypes from "../constants/actionTypes";

export interface IServerTime {
  server_time: string;
}
export interface ServerTimeState {
  pending: boolean;
  server_time: string;
  error: string | null;
}
export interface FetchServerTimeSuccessPayload {
  serverTime: IServerTime;
}
export interface FetchServerTimeFailurePayload {
  error: string;
}

export interface FetchServerTimeRequest {
  type: typeof actionTypes.FETCH_SERVER_TIME_REQUEST;
}
export type FetchServerTimeSuccess = {
  type: typeof actionTypes.FETCH_SERVER_TIME_SUCCESS;
  payload: FetchServerTimeSuccessPayload;
};
export type FetchServerTimeFailure = {
  type: typeof actionTypes.FETCH_SERVER_TIME_FAILURE;
  payload: FetchServerTimeFailurePayload;
};
export type ServerTimeAction =
  | FetchServerTimeRequest
  | FetchServerTimeSuccess
  | FetchServerTimeFailure;
