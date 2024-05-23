import actionTypes from "../constants/actionTypes/createVideoActionTypes";

import {
  CreateVideoSuccessPayload,
  CreateVideoPayload,
  CreateVideoFailurePayload,
} from "../types/createVideoTypes";

export const createVideoAction = (
  signedUrl: string,
  payload: any
): CreateVideoPayload => ({
  type: actionTypes.CREATE_VIDEO,
  signedUrl,
  payload,
});

export const createVideoSuccess = ({ payload }: CreateVideoSuccessPayload) => ({
  type: actionTypes.CREATE_VIDEO_SUCCESS,
  payload,
});

export const createVideoFailure = ({ payload }: CreateVideoFailurePayload) => ({
  type: actionTypes.CREATE_VIDEO_FAILURE,
  payload,
});
