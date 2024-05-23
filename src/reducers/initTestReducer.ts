import { combineReducers } from "redux";

import actionTypes from "../constants/actionTypes/initTestActionsTypes";
import { InitTestActions, StartTestActions } from "../types/initTestTypes";

const initTestInitialState: any = {
  loading: false,
  data: {},
  error: null
};
const initStartTestState: any = {
  loading: false,
  data: {},
  error: null
};
export const getInitTestDetails = (state = initTestInitialState, action: InitTestActions) => {
  switch (action.type) {
    case actionTypes.FETCH_INIT_TEST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_INIT_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };
    case actionTypes.FETCH_INIT_TEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
export const getStartTestDetails = (state = initStartTestState, action: StartTestActions) => {
  switch (action.type) {
    case actionTypes.FETCH_START_TEST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_START_TEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };
    case actionTypes.FETCH_START_TEST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};

export const combineInitAndStart = combineReducers({
  getInitTestDetails,
  getStartTestDetails
});
