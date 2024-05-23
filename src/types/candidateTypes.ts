import actionTypes from "../constants/actionTypes/typeHackerRecruiter";

export type FetchHackerPayload = any;
export type FetchHackerSuccessPayload = any;
export type FetchHackerFailurePayload = any;
export type FetchHackerSuccess = {
  type: typeof actionTypes.FETCH_HACKER_SUCCESS;
  payload: { data: any };
};
export type FetchHackerFailure = {
  type: typeof actionTypes.FETCH_HACKER_FAILURE;
  payload: { error: any };
};
export type FetchHackerRequest = {
  type: typeof actionTypes.FETCH_HACKER;
  user_id: any;
  username: any;
};

export type FetchRecruiterPayload = any;
export type FetchRecruiterSuccessPayload = any;
export type FetchRecruiterFailurePayload = any;
export type FetchRecruiterSuccess = {
  type: typeof actionTypes.FETCH_RECRUITER_SUCCESS;
  payload: { data: any };
};
export type FetchRecruiterFailure = {
  type: typeof actionTypes.FETCH_RECRUITER_FAILURE;
  payload: { error: any };
};
export type FetchRecruiterRequest = {
  type: typeof actionTypes.FETCH_RECRUITER;
  user_id: any;
  username: any;
};

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

export type FetchUserTypePayload = any;
export type FetchUserTypeSuccessPayload = any;
export type FetchUserTypeFailurePayload = any;
export type FetchUserTypeSuccess = {
  type: typeof actionTypes.FETCH_USER_SUCCESS;
  payload: { data: any };
};
export type FetchUserTypeFailure = {
  type: typeof actionTypes.FETCH_USER_FAILURE;
  payload: { error: any };
};
export type FetchUserTypeRequest = {
  type: typeof actionTypes.FETCH_USER_TYPE;
  user_type: any;
  user_id: any;
  username: any;
};
export type CandidateActions =
  | FetchHackerSuccess
  | FetchHackerFailure
  | FetchHackerRequest
  | FetchRecruiterSuccess
  | FetchRecruiterFailure
  | FetchRecruiterRequest
  | FetchTestSolFailure
  | FetchTestSolRequest
  | FetchTestSolSuccess
  | FetchUserTypeSuccess
  | FetchUserTypeFailure
  | FetchUserTypeRequest;
