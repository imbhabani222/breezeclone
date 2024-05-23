import actionTypes from "../constants/actionTypes/createProctorActionsTypes";

export type CreateProctorPayload = {
  type: string;
  assessmentType: string;
  assessmentId: number;
};
export type CreateProctorSuccessPayload = { payload: object | Array<string> };
export type CreateProctorFailurePayload = { payload: object | Array<string> };
export type createProctorSuccess = {
  type: typeof actionTypes.CREATE_PROCTOR_SUCCESS;
  payload: { data: object };
};
export type createProctorFailure = {
  type: typeof actionTypes.CREATE_PROCTOR_FAILURE;
  payload: { error: object | string };
};
export type createProctorRequest = {
  type: typeof actionTypes.CREATE_PROCTOR;
  assessmentType: string;
  assessmentId: string;
};

export type createProctorActions =
  | createProctorFailure
  | createProctorRequest
  | createProctorSuccess;
