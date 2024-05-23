import { combineReducers } from "redux";
import actionTypes from "../constants/actionTypes";
import {
  ProblemAction,
  PostTestAction,
  ProblemState,
  PostTestState,
  SolutionSetState,
  SolutionSetAction,
  PostSectionAction,
} from "../types/problemActionTypes";

const initialStateProblem: ProblemState = {
  pending: false,
  allProblems: "",
  error: null,
};

const postTestState: PostTestState = {
  pending: false,
  data: {},
  error: null,
};

const solutionSetState: SolutionSetState = {
  pending: false,
  allProblems: "",
  error: null,
  statusCode: null,
};
// eslint-disable-next-line import/no-anonymous-default-export
const problemReducer = (state = initialStateProblem, action: ProblemAction) => {
  switch (action.type) {
    case actionTypes.FETCH_PROBLEM_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.FETCH_PROBLEM_SUCCESS:
      return {
        ...state,
        pending: false,
        allProblems: action.payload.allProblems,
        error: null,
      };
    case actionTypes.FETCH_PROBLEM_FAILURE:
      return {
        ...state,
        pending: false,
        allProblems: "",
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

const postTestReducer = (state = postTestState, action: PostTestAction) => {
  switch (action.type) {
    case actionTypes.POST_TEST_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.POST_TEST_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload.data,
        error: null,
      };
    case actionTypes.POST_TEST_FAILURE:
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

//
const postSectionReducer = (
  state = postTestState,
  action: PostSectionAction
) => {
  switch (action.type) {
    case actionTypes.POST_SECTION_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.POST_SECTION_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload.data,
        error: null,
      };
    case actionTypes.POST_SECTION_FAILURE:
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

///
const solutionSetReducer = (
  state = solutionSetState,
  action: SolutionSetAction
) => {
  switch (action.type) {
    case actionTypes.FETCH_SOLUTIONSET_REQUEST:
      return {
        ...state,
        pending: true,
        statusCode: null,
      };
    case actionTypes.FETCH_SOLUTIONSET_SUCCESS:
      return {
        ...state,
        pending: false,
        allProblems: action.payload.allProblems,
        statusCode: action.payload.statusCode,
        error: null,
      };
    case actionTypes.FETCH_SOLUTIONSET_FAILURE:
      return {
        ...state,
        pending: false,
        allProblems: "",
        error: action.payload.error,
        statusCode: action.payload.statusCode,
      };
    default:
      return {
        ...state,
      };
  }
};

export const problemsReducer = combineReducers({
  problemReducer,
  postTestReducer,
  solutionSetReducer,
  postSectionReducer,
});
