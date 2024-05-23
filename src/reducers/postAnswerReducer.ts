import actionTypes from "../constants/actionTypes/postAnswerActionsTypes";
import { postAnswerActions } from "../types/postAnswerTypes";
import { combineReducers } from "redux";

const initialState = {
  pending: false,
  data: {},
  error: null,
};
export const postAnswerReducer = (
  state = initialState,
  action: postAnswerActions
) => {
  switch (action.type) {
    case actionTypes.POST_ANSWER:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.POST_ANSWER_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload.data,
      };
    case actionTypes.POST_ANSWER_FAILURE:
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

export const combinePostAnswerReducer = combineReducers({
  postAnswerReducer,
});
