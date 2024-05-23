import actionTypes from "../constants/actionTypes";

import {
  PostFeedbackRequest,
  PostFeedbackSuccess,
  PostFeedbackFailure
} from "../types/feedbackTypes";

export type PostFeedbackSuccessPayload = any;
export type PostFeedbackFailurePayload = any;

export const postFeedbackRequest = (userName: string, payload: any) => ({
  type: actionTypes.POST_FEEDBACk_REQUEST,
  userName,
  payload
});

export const postFeedbackSuccess = (payload: PostFeedbackSuccessPayload): PostFeedbackSuccess => ({
  type: actionTypes.POST_FEEDBACK_SUCCESS,
  payload
});

export const postFeedbackFailure = (payload: PostFeedbackFailurePayload): PostFeedbackFailure => ({
  type: actionTypes.POST_FEEDBACK_FAILURE,
  payload
});
