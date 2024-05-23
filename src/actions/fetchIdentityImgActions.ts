import actionTypes from "../constants/actionTypes/fetchIdentityActionsTypes";

import {
  FetchIdentityImgSuccessPayload,
  FetchIdentityImgPayload,
  FetchIdentityImgFailurePayload,
} from "../types/fetchIdentityImgTypes";

export const fetchIdentityImgAction = (
  assessmentType: string,
  assessmentId: number
): FetchIdentityImgPayload => ({
  type: actionTypes.FETCH_IDENTITY_IMG,
  assessmentType,
  assessmentId,
});

export const fetchIdentityImgSuccess = ({
  payload,
}: FetchIdentityImgSuccessPayload) => ({
  type: actionTypes.FETCH_IDENTITY_IMG_SUCCESS,
  payload,
});

export const fetchIdentityImgFailure = ({
  payload,
}: FetchIdentityImgFailurePayload) => ({
  type: actionTypes.FETCH_IDENTITY_IMG_FAILURE,
  payload,
});
