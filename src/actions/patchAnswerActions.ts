import actionTypes from "../constants/actionTypes";

import {
  PatchAnswerRequest,
  PatchAnswerSuccess,
  PatchAnswerSuccessPayload,
  PatchAnswerFailure,
  PatchAnswerFailurePayload,
} from "../types/patchAnswerTypes";

export const patchAnswerActions = (
  patchId: number,
  username: string,
  patchPayload: any
): PatchAnswerRequest => ({
  type: actionTypes.PATCH_ANSWER_REQUEST,
  patchId,
  username,
  patchPayload,
});

export const patchAnswerActionsSuccess = (
  payload: PatchAnswerSuccessPayload
): PatchAnswerSuccess => ({
  type: actionTypes.PATCH_ANSWER_REQUEST_SUCCESS,
  payload,
});

export const patchAnswerActionsFailure = (
  payload: PatchAnswerFailurePayload
): PatchAnswerFailure => ({
  type: actionTypes.PATCH_ANSWER_REQUEST_FAILURE,
  payload,
});
