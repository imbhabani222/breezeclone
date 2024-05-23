import { combineReducers } from "redux";

import actionTypes from "../constants/actionTypes/typeHackerRecruiter";
import { CandidateActions } from "../types/candidateTypes";

const hackerInitialState: any = {
  loading: false,
  data: {},
  error: null,
};
const recruiterInitialState: any = {
  loading: false,
  data: {},
  error: null,
};
export const getHackerDetails = (
  state = hackerInitialState,
  action: CandidateActions
) => {
  switch (action.type) {
    case actionTypes.FETCH_HACKER:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_HACKER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case actionTypes.FETCH_HACKER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export const getRecruiterDetails = (
  state = recruiterInitialState,
  action: CandidateActions
) => {
  switch (action.type) {
    case actionTypes.FETCH_RECRUITER:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_RECRUITER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case actionTypes.FETCH_RECRUITER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
export const getCandidateSolSet = (
  state = recruiterInitialState,
  action: CandidateActions
) => {
  switch (action.type) {
    case actionTypes.FETCH_TEST_SOLUTION:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_TEST_SOLUTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case actionTypes.FETCH_TEST_SOLUTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export const getUserType = (
  state = recruiterInitialState,
  action: CandidateActions
) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_TYPE:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case actionTypes.FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
export const combineReducer = combineReducers({
  getRecruiterDetails,
  getHackerDetails,
  getCandidateSolSet,
  getUserType,
});
