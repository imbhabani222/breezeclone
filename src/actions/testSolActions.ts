import actionTypes from "../constants/actionTypes/testSoulutionSetTypes";

import {
  FetchTestSolRequest,
  FetchTestSolSuccess,
  FetchTestSolSuccessPayload,
  FetchTestSolFailure,
  FetchTestSolFailurePayload
} from "../types/testSolTypes";

export const fetchTestSolActions = (
  usertype: any,
  user_id: any,
  slug: any,
  platform: any,
  username: any
): FetchTestSolRequest => ({
  type: actionTypes.FETCH_TEST_SOLUTION,
  usertype,
  user_id,
  slug,
  platform,
  username
});

export const fetchTestSolActionsSuccess = (
  payload: FetchTestSolSuccessPayload
): FetchTestSolSuccess => ({
  type: actionTypes.FETCH_TEST_SOLUTION_SUCCESS,
  payload
});

export const fetchTestSolActionsFailure = (
  payload: FetchTestSolFailurePayload
): FetchTestSolFailure => ({
  type: actionTypes.FETCH_TEST_SOLUTION_FAILURE,
  payload
});
