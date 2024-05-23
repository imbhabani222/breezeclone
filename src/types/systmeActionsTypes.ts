import actionTypes from "../constants/actionTypes/systemActionsTypes";

export type SytemActionsState = {
  pending: boolean;
  error: string | null;
  timeLeft: any;
  declarationStatus: boolean;
  modalStatus: boolean;
  getVidSignedUrl: string;
};
export type SystemActionsSuccessPayload = { payload: object | Array<string> };
export type SystemActionsFailurePayload = { payload: object | Array<string> };

export type systemActionSuccess = {
  type: typeof actionTypes.SYSTEM_ACTION_SUCCESS;
  payload: any;
};
export type systemActionFailure = {
  type: typeof actionTypes.SYSTEM_ACTION_FAILURE;
  payload: any;
};
export type systemActionRequest = {
  type: typeof actionTypes.SYSTEM_ACTION;
};

export type SystemActions =
  | systemActionFailure
  | systemActionRequest
  | systemActionSuccess;
