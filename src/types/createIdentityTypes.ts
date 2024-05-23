import actionTypes from "../constants/actionTypes/createIdentityActionsTypes";

export type CreateIdentityPayload = {
  type: string;
  assessmentType: string;
  assessmentId: number;
  payload: any;
};
export type CreateIdentitySuccessPayload = { payload: object | Array<string> };
export type CreateIdentityFailurePayload = { payload: object | Array<string> };
export type createIdentitySuccess = {
  type: typeof actionTypes.CREATE_IDENTITY_SUCCESS;
  payload: { data: object };
};
export type createIdentityFailure = {
  type: typeof actionTypes.CREATE_IDENTITY_FAILURE;
  payload: { error: object | string };
};
export type createIdentityRequest = {
  type: typeof actionTypes.CREATE_IDENTITY;
  assessmentType: string;
  assessmentId: string;
};

export type createIdentityActions =
  | createIdentityFailure
  | createIdentityRequest
  | createIdentitySuccess;
