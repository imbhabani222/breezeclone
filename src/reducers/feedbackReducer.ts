import actionTypes from "../constants/actionTypes";
import { PostFeedbackAction, PostFeedbackState } from "../types/feedbackTypes";

const initialStateServerTime: PostFeedbackState = {
  pending: false,
  data: {},
  error: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialStateServerTime, action: PostFeedbackAction) => {
  switch (action.type) {
    case actionTypes.POST_FEEDBACk_REQUEST:
      return {
        ...state,
        pending: true
      };
    case actionTypes.POST_FEEDBACK_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload.data,
        error: null
      };
    case actionTypes.POST_FEEDBACK_FAILURE:
      return {
        ...state,
        pending: false,
        data: "",
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
