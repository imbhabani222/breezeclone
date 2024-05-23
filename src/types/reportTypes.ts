import actionTypes from "../constants/actionTypes";

export interface PostReportIssueState {
  pending: boolean;
  data: object;
  error: string | null;
}
export interface PostReportIssueRequest {
  type: typeof actionTypes.POST_REPORT_ISSUE_REQUEST;
  platform: string;
  userName: string;
  payload: any;
}

export type PostFeedbackSuccessPayload = any;
export type PostFeedbackFailurePayload = any;

export type PostReportIssueSuccess = {
  type: typeof actionTypes.POST_REPORT_ISSUE_SUCCESS;
  payload: { data: any };
};
export type PostReportIssueFailure = {
  type: typeof actionTypes.POST_REPORT_ISSUE_FAILURE;
  payload: { error: any };
};

export type PostReportIssueAction =
  | PostReportIssueRequest
  | PostReportIssueSuccess
  | PostReportIssueFailure;
