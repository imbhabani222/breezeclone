import actionTypes from "../constants/actionTypes";

import {
  PostUploadAttchmentRequest,
  PostUploadAttchmentSuccess,
  PostUploadAttchmentFailure,
} from "../types/uploadType";

export type PostReportIssueSuccessPayload = any;
export type PostReportIssueFailurePayload = any;

export const postUploadAttchmentRequest = (
  platform: string,
  userName: string,
  payload: any
): PostUploadAttchmentRequest => ({
  type: actionTypes.POST_UPLOAD_FILE_REQUEST,
  platform,
  userName,
  payload,
});

export const postUploadAttchmentSuccess = (
  payload: PostReportIssueSuccessPayload
): PostUploadAttchmentSuccess => ({
  type: actionTypes.POST_UPLOAD_FILE_SUCCESS,
  payload,
});

export const postUploadAttchmentFailure = (
  payload: PostReportIssueFailurePayload
): PostUploadAttchmentFailure => ({
  type: actionTypes.POST_UPLOAD_FILE_FAILURE,
  payload,
});
