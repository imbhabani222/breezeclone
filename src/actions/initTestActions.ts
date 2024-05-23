import actionTypes from "../constants/actionTypes/initTestActionsTypes";

import {
  FetchInitTestRequest,
  FetchInitTestSuccess,
  FetchInitTestSuccessPayload,
  FetchInitTestFailure,
  FetchInitTestFailurePayload,
  FetchStartTestRequest,
  FetchStartTestSuccess,
  FetchStartTestSuccessPayload,
  FetchStartTestFailure,
  FetchStartTestFailurePayload,
  FetchStartTestPayload,
} from "../types/initTestTypes";

export const fetchInitTestActions = (
  test_id: any,
  username: any,
  payload: any
): FetchInitTestRequest => ({
  type: actionTypes.FETCH_INIT_TEST,
  test_id,
  username,
  payload,
});

export const fetchInitTestActionsSuccess = (
  payload: FetchInitTestSuccessPayload
): FetchInitTestSuccess => ({
  type: actionTypes.FETCH_INIT_TEST_SUCCESS,
  payload,
});

export const fetchInitTestActionsFailure = (
  payload: FetchInitTestFailurePayload
): FetchInitTestFailure => ({
  type: actionTypes.FETCH_INIT_TEST_FAILURE,
  payload,
});

export const fetchStartTestActions = (
  test_id: any,
  username: any
): FetchStartTestRequest => ({
  type: actionTypes.FETCH_START_TEST,
  test_id,
  username,
});

export const fetchStartTestActionsSuccess = (
  payload: FetchStartTestSuccessPayload
): FetchStartTestSuccess => ({
  type: actionTypes.FETCH_START_TEST_SUCCESS,
  payload,
});

export const fetchStartTestActionsFailure = (
  payload: FetchStartTestFailurePayload
): FetchStartTestFailure => ({
  type: actionTypes.FETCH_START_TEST_FAILURE,
  payload,
});
