import actionTypes from "../constants/actionTypes/fetchIdentityActionsTypes";

export type FetchIdentityImgPayload = {
  type: string;
  assessmentType: string;
  assessmentId: number;
};
export type FetchIdentityImgSuccessPayload = {
  payload: object | Array<string>;
};
export type FetchIdentityImgFailurePayload = {
  payload: object | Array<string>;
};
export type featchIdentityImgSuccess = {
  type: typeof actionTypes.FETCH_IDENTITY_IMG_SUCCESS;
  payload: { data: object };
};
export type featchIdentityImgFailure = {
  type: typeof actionTypes.FETCH_IDENTITY_IMG_FAILURE;
  payload: { error: object | string };
};
export type featchIdentityImgRequest = {
  type: typeof actionTypes.FETCH_IDENTITY_IMG;
  assessmentType: string;
  assessmentId: string;
};

export type fetchIdentityImgActions =
  | featchIdentityImgFailure
  | featchIdentityImgRequest
  | featchIdentityImgSuccess;
