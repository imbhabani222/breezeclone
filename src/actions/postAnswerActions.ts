import actionTypes from "../constants/actionTypes/postAnswerActionsTypes";

import {
  PostAnswerSuccessPayload,
  PostAnswerPayload,
  PostAnswerFailurePayload,
} from "../types/postAnswerTypes";

export const postAnswerAction = (
  username: string,
  payload: any
): PostAnswerPayload => ({
  type: actionTypes.POST_ANSWER,
  username,
  payload,
});

export const postAnswerSuccess = (payload: PostAnswerSuccessPayload) => ({
  type: actionTypes.POST_ANSWER_SUCCESS,
  payload,
});

export const postAnswerFailure = ({ payload }: PostAnswerFailurePayload) => ({
  type: actionTypes.POST_ANSWER_FAILURE,
  payload,
});
