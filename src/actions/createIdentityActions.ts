import actionTypes from "../constants/actionTypes/createIdentityActionsTypes";

import {
  CreateIdentitySuccessPayload,
  CreateIdentityPayload,
  CreateIdentityFailurePayload,
} from "../types/createIdentityTypes";

export const createIdentityAction = (
  assessmentType: string,
  assessmentId: number,
  payload: any
): CreateIdentityPayload => ({
  type: actionTypes.CREATE_IDENTITY,
  assessmentType,
  assessmentId,
  payload,
});

export const createIdentitySuccess = ({
  payload,
}: CreateIdentitySuccessPayload) => ({
  type: actionTypes.CREATE_IDENTITY_SUCCESS,
  payload,
});

export const createIdentityFailure = ({
  payload,
}: CreateIdentityFailurePayload) => ({
  type: actionTypes.CREATE_IDENTITY_FAILURE,
  payload,
});
