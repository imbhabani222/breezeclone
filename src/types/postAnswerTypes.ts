import actionTypes from "../constants/actionTypes/postAnswerActionsTypes";

export type PostAnswerPayload = {
  type: string;
  username: string;
  payload: object | Array<string>;
};
export type PostAnswerSuccessPayload = any;
export type PostAnswerFailurePayload = any;

export type postAnswerRequest = {
  type: typeof actionTypes.POST_ANSWER;
  username: string;
};

export type postAnswerSuccess = {
  type: typeof actionTypes.POST_ANSWER_SUCCESS;
  payload: { data: object };
};
export type postAnswerFailure = {
  type: typeof actionTypes.POST_ANSWER_FAILURE;
  payload: { error: object | string };
};

export type postAnswerActions =
  | postAnswerFailure
  | postAnswerRequest
  | postAnswerSuccess;
