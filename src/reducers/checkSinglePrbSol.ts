import actionTypes from "../constants/actionTypes";
import { QuestionsAction, SinglePrbSol } from "../types/questionsActionTypes";

const initialStateProblem: any = {
  pending: false,
  data: "",
  error: null,
  statusCode: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialStateProblem, action: SinglePrbSol) => {
  switch (action.type) {
    case actionTypes.FETCH_SINGLE_PRB_SOL_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.FETCH_SINGLE_PRB_SOL_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload,
        error: null,
        statusCode: action.payload.statusCode,
      };
    case actionTypes.FETCH_SINGLE_MCQ_SOL_FAILURE:
      return {
        ...state,
        pending: false,
        singleProblem: "",
        error: action.payload.error,
        statusCode: action.payload.statusCode.status,
      };
    default:
      return {
        ...state,
      };
  }
};
