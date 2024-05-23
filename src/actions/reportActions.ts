import actionTypes from "../constants/actionTypes";

import {
  PostReportIssueRequest,
  PostReportIssueSuccess,
  PostReportIssueFailure,
} from "../types/reportTypes";

export type PostReportIssueSuccessPayload = any;
export type PostReportIssueFailurePayload = any;

export const postReportIssueRequest = (
  platform: string,
  userName: string,
  payload: any
): PostReportIssueRequest => ({
  type: actionTypes.POST_REPORT_ISSUE_REQUEST,
  platform,
  userName,
  payload,
});

export const postReportIssueSuccess = (
  payload: PostReportIssueSuccessPayload
): PostReportIssueSuccess => ({
  type: actionTypes.POST_REPORT_ISSUE_SUCCESS,
  payload,
});

export const postReportIssueFailure = (
  payload: PostReportIssueFailurePayload
): PostReportIssueFailure => ({
  type: actionTypes.POST_REPORT_ISSUE_FAILURE,
  payload,
});
