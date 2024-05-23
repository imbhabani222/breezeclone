import actionTypes from "../constants/actionTypes/initTestActionsTypes";

export type FetchInitTestPayload = any;
export type FetchInitTestSuccessPayload = any;
export type FetchInitTestFailurePayload = any;

export type FetchInitTestSuccess = {
  type: typeof actionTypes.FETCH_INIT_TEST_SUCCESS;
  payload: { data: any };
};
export type FetchInitTestFailure = {
  type: typeof actionTypes.FETCH_INIT_TEST_FAILURE;
  payload: { error: any };
};
export type FetchInitTestRequest = {
  type: typeof actionTypes.FETCH_INIT_TEST;
  test_id: any;
  username: any;
  payload: any;
};

export type FetchStartTestPayload = any;
export type FetchStartTestSuccessPayload = any;
export type FetchStartTestFailurePayload = any;
export type FetchStartTestSuccess = {
  type: typeof actionTypes.FETCH_START_TEST_SUCCESS;
  payload: { data: any };
};
export type FetchStartTestFailure = {
  type: typeof actionTypes.FETCH_START_TEST_FAILURE;
  payload: { error: any };
};
export type FetchStartTestRequest = {
  type: typeof actionTypes.FETCH_START_TEST;
  test_id: any;
  username: any;
};

export type InitTestActions =
  | FetchInitTestFailure
  | FetchInitTestRequest
  | FetchInitTestSuccess;
export type StartTestActions =
  | FetchStartTestFailure
  | FetchStartTestRequest
  | FetchStartTestSuccess;
