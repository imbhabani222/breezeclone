import actionTypes from "../constants/actionTypes/createVideoActionTypes";

export type CreateVideoPayload = {
  type: string;
  signedUrl: string;
  payload: any;
};
export type CreateVideoSuccessPayload = { payload: object | Array<string> };
export type CreateVideoFailurePayload = { payload: object | Array<string> };
export type createVideoSuccess = {
  type: typeof actionTypes.CREATE_VIDEO_SUCCESS;
  payload: { data: object };
};
export type createVideoFailure = {
  type: typeof actionTypes.CREATE_VIDEO_FAILURE;
  payload: { error: object | string };
};
export type createVideoRequest = {
  type: typeof actionTypes.CREATE_VIDEO;
  assessmentType: string;
  assessmentId: string;
};

export type createVideoActions =
  | createVideoFailure
  | createVideoRequest
  | createVideoSuccess;
