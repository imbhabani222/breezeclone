import actionTypes from "../constants/actionTypes";

export type PatchAnswerPayload = any;
export type PatchAnswerSuccessPayload = any;
export type PatchAnswerFailurePayload = any;

export type PatchAnswerSuccess = {
  type: typeof actionTypes.PATCH_ANSWER_REQUEST_SUCCESS;
  payload: { data: any };
};
export type PatchAnswerFailure = {
  type: typeof actionTypes.PATCH_ANSWER_REQUEST_FAILURE;
  payload: { error: any };
};
export type PatchAnswerRequest = {
  type: typeof actionTypes.PATCH_ANSWER_REQUEST;
  patchId: number;
  username: string;
  patchPayload: any;
};
export type PatchAnswerActions =
  | PatchAnswerFailure
  | PatchAnswerRequest
  | PatchAnswerSuccess;
