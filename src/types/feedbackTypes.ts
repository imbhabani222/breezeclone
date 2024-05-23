import actionTypes from "../constants/actionTypes";

export interface PostFeedbackState {
  pending: boolean;
  data: object;
  error: string | null;
}
export interface PostFeedbackRequest {
  type: typeof actionTypes.POST_FEEDBACk_REQUEST;
  test_id: number;
}

export type PostFeedbackSuccessPayload = any;
export type PostFeedbackFailurePayload = any;

export type PostFeedbackSuccess = {
  type: typeof actionTypes.POST_FEEDBACK_SUCCESS;
  payload: { data: any };
};
export type PostFeedbackFailure = {
  type: typeof actionTypes.POST_FEEDBACK_FAILURE;
  payload: { error: any };
};

export type PostFeedbackAction =
  | PostFeedbackRequest
  | PostFeedbackSuccess
  | PostFeedbackFailure;
