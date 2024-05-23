import actionTypes from "../constants/actionTypes";
import actions from "../constants/actionTypes";

import {
  FetchTodoRequest,
  FetchTodoSuccess,
  FetchTodoSuccessPayload,
  FetchTodoFailure,
  FetchTodoFailurePayload,
  FetchIdentityRequest,
  FetchIdentitySuccessPayload,
  FetchIdentityFailurePayload,
  FetchIdentityRequestSuccess,
  FetchIdentityRequestFailure,
  FetchIdentityPayload,
} from "../types/types";

export const fetchTodoRequest = (): FetchTodoRequest => ({
  type: actionTypes.FETCH_TODO_REQUEST,
});

export const fetchTodoSuccess = (
  payload: FetchTodoSuccessPayload
): FetchTodoSuccess => ({
  type: actionTypes.FETCH_TODO_SUCCESS,
  payload,
});

export const fetchTodoFailure = (
  payload: FetchTodoFailurePayload
): FetchTodoFailure => ({
  type: actionTypes.FETCH_TODO_FAILURE,
  payload,
});

export const sampleAction = () => ({
  type: actions.SAMPLE_ACTION,
});

export const systemActions = (data: any) => ({
  type: actions.ACTIONS,
  data,
});

export const fetchIdentityActions = (): FetchIdentityRequest => ({
  type: actionTypes.FETCH_IDENTITY,
});

export const fetchIdentityActionsSuccess = (
  payload: FetchIdentitySuccessPayload
): FetchIdentityRequestSuccess => ({
  type: actionTypes.FETCH_IDENTITY_SUCCESS,
  payload,
});

export const fetchIdentityActionsFailure = (
  payload: FetchIdentityFailurePayload
): FetchIdentityRequestFailure => ({
  type: actionTypes.FETCH_IDENTITY_FAILURE,
  payload,
});

export const checkAction = (data: any) => ({
  type: "CHECK_ACTION",
  data,
});

export const getCustomResultAction = (data: any) => ({
  type: "GET_CUSTOM_RESULT",
  data,
});

export const getTestCasesResultAction = (data: any) => ({
  type: "GET_TESTCASES_RESULT",
  data,
});
