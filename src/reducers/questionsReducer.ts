import { combineReducers } from "redux";
import actionTypes from "../constants/actionTypes";
import {
  QuestionsAction,
  QuestionsState,
  DeleteQuestionsAction,
} from "../types/questionsActionTypes";

const initialStateProblem: QuestionsState = {
  pending: false,
  singleProblem: "",
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
const questionsReducer = (
  state = initialStateProblem,
  action: QuestionsAction
) => {
  switch (action.type) {
    case actionTypes.FETCH_QUESTIONS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        pending: false,
        singleProblem: action.payload.singleProblem,
        error: null,
      };
    case actionTypes.FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        pending: false,
        singleProblem: "",
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

const initialStateDeleteProblem: any = {
  pending: false,
  data: {},
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
const deleteQuestionsReducer = (
  state = initialStateDeleteProblem,
  action: DeleteQuestionsAction
) => {
  switch (action.type) {
    case actionTypes.DELETE_ANSWER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.DELETE_ANSWER_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload.data,
        error: null,
      };
    case actionTypes.DELETE_ANSWER_FAILURE:
      return {
        ...state,
        pending: false,
        data: "",
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export const combineQuestionsReducer = combineReducers({
  questionsReducer,
  deleteQuestionsReducer,
});
