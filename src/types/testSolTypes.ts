import actionTypes from "../constants/actionTypes/testSoulutionSetTypes";

export type FetchTestSolPayload = any;
export type FetchTestSolSuccessPayload = any;
export type FetchTestSolFailurePayload = any;

export type FetchTestSolSuccess = {
  type: typeof actionTypes.FETCH_TEST_SOLUTION_SUCCESS;
  payload: { data: any };
};
export type FetchTestSolFailure = {
  type: typeof actionTypes.FETCH_TEST_SOLUTION_FAILURE;
  payload: { error: any };
};
export type FetchTestSolRequest = {
  type: typeof actionTypes.FETCH_TEST_SOLUTION;
  usertype: any;
  user_id: any;
  slug: any;
  platform: any;
  username: any;
};

export type TestSolActions =
  | FetchTestSolFailure
  | FetchTestSolRequest
  | FetchTestSolSuccess;
