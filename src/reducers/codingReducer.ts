import { combineReducers } from "redux";
import actionTypes from "../constants/actionTypes";
import {
  LanguageAction,
  RunCodeCustomAction,
  PostSolutionsSubmitAction,
  RunCodeCustomResult,
} from "../types/codingActionTypes";

const initialState = {
  loading: false,
  data: {},
  error: null,
};
// eslint-disable-next-line import/no-anonymous-default-export

export const languageReducer = (
  state = initialState,
  action: LanguageAction
) => {
  switch (action.type) {
    case actionTypes.GET_LANGUAGE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.GET_LANGUAGE_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload.data,
        error: null,
      };
    case actionTypes.GET_LANGUAGE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export const runCodeCustomReducer = (
  state = initialState,
  action: RunCodeCustomAction
) => {
  switch (action.type) {
    case actionTypes.RUN_CODE_CUSTOM_INPUT_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.RUN_CODE_CUSTOM_INPUT_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload.data,
        error: null,
      };
    case actionTypes.RUN_CODE_CUSTOM_INPUT_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export const postSolutionsSubmitReducer = (
  state = initialState,
  action: PostSolutionsSubmitAction
) => {
  switch (action.type) {
    case actionTypes.TESTCASES_RUN_CODE__REQUEST:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.TESTCASES_RUN_CODE__SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload.data,
        error: null,
      };
    case actionTypes.TESTCASES_RUN_CODE__FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
