import actionTypes from "../constants/actionTypes";

import {
  FetchProblemRequest,
  FetchProblemFailure,
  FetchProblemFailurePayload,
  FetchProblemSuccess,
  FetchProblemSuccessPayload,
  FetchSolutionSetRequest,
  FetchSolutionSetSuccess,
  FetchSolutionSetFailure,
  FetchSolutionSetSuccessPayload,
  FetchSolutionSetFailurePayload,
  PostTestRequest,
  PostTestSuccess,
  PostTestSuccessPayload,
  PostTestFailure,
  PostTestFailurePayload,
  PostSectionRequest,
  PostSectionSuccess,
  PostSectionFailure,
} from "../types/problemActionTypes";

export const fetchProblemRequest = (problem_id: number) => ({
  type: actionTypes.FETCH_PROBLEM_REQUEST,
  problem_id,
});

export const fetchProblemSuccess = (
  payload: FetchProblemSuccessPayload
): FetchProblemSuccess => ({
  type: actionTypes.FETCH_PROBLEM_SUCCESS,
  payload,
});

export const fetchProblemFailure = (
  payload: FetchProblemFailurePayload
): FetchProblemFailure => ({
  type: actionTypes.FETCH_PROBLEM_FAILURE,
  payload,
});

//POST TEST
export const finishTestRequest = (
  test_id: number,
  username: string
): PostTestRequest => ({
  type: actionTypes.POST_TEST_REQUEST,
  username,
  test_id,
});

export const finishTestSuccess = (
  payload: PostTestSuccessPayload
): PostTestSuccess => ({
  type: actionTypes.POST_TEST_SUCCESS,
  payload,
});

export const finishTestFailure = (
  payload: PostTestFailurePayload
): PostTestFailure => ({
  type: actionTypes.POST_TEST_FAILURE,
  payload,
});

// GET SOLUTION SET
export const fetchSolutionSetRequest = (problem_id: number) => ({
  type: actionTypes.FETCH_SOLUTIONSET_REQUEST,
  problem_id,
});

export const fetchSolutionSetSuccess = (
  payload: FetchSolutionSetSuccessPayload
): FetchSolutionSetSuccess => ({
  type: actionTypes.FETCH_SOLUTIONSET_SUCCESS,
  payload,
});

export const fetchSolutionSetFailure = (
  payload: FetchSolutionSetFailurePayload
): FetchSolutionSetFailure => ({
  type: actionTypes.FETCH_SOLUTIONSET_FAILURE,
  payload,
});

///POST SECTION

export const postSectionRequest = (
  platform: string,
  userName: string,
  payload: any
): PostSectionRequest => ({
  type: actionTypes.POST_SECTION_REQUEST,
  platform,
  userName,
  payload,
});

export const postSectionSuccess = (
  payload: PostTestSuccessPayload
): PostSectionSuccess => ({
  type: actionTypes.POST_SECTION_SUCCESS,
  payload,
});

export const postSectionFailure = (
  payload: PostTestFailurePayload
): PostSectionFailure => ({
  type: actionTypes.POST_SECTION_FAILURE,
  payload,
});
