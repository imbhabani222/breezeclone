import actionTypes from "../constants/actionTypes";
import {
  PostReportIssueAction,
  PostReportIssueState,
} from "../types/reportTypes";

const initialReportIssueState: PostReportIssueState = {
  pending: false,
  data: {},
  error: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (
  state = initialReportIssueState,
  action: PostReportIssueAction
) => {
  switch (action.type) {
    case actionTypes.POST_REPORT_ISSUE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.POST_REPORT_ISSUE_SUCCESS:
      return {
        ...state,
        pending: false,
        data: action.payload.data,
        error: null,
      };
    case actionTypes.POST_REPORT_ISSUE_FAILURE:
      return {
        ...state,
        pending: false,
        data: "",
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
