import actionTypes from "../constants/actionTypes/systemActionsTypes";

import {
  systemActionSuccess,
  systemActionFailure,
  systemActionRequest,
  SystemActionsSuccessPayload,
  SystemActionsFailurePayload,
} from "../types/systmeActionsTypes";

export const systemAction = (): systemActionRequest => ({
  type: actionTypes.SYSTEM_ACTION,
});

export const getSystemActionSuccess = (
  payload: SystemActionsSuccessPayload
): systemActionSuccess => ({
  type: actionTypes.SYSTEM_ACTION_SUCCESS,
  payload,
});

export const fetchIdentityActionsFailure = (
  payload: SystemActionsFailurePayload
): systemActionFailure => ({
  type: actionTypes.SYSTEM_ACTION_FAILURE,
  payload,
});
