import actionTypes from "../constants/actionTypes/createProctorActionsTypes";

import {
  CreateProctorSuccessPayload,
  CreateProctorPayload,
  CreateProctorFailurePayload,
} from "../types/createProctorTypes";

export const createProctorAction = (
  assessmentType: string,
  assessmentId: number
): CreateProctorPayload => ({
  type: actionTypes.CREATE_PROCTOR,
  assessmentType,
  assessmentId,
});

export const createProctorSuccess = ({
  payload,
}: CreateProctorSuccessPayload) => ({
  type: actionTypes.CREATE_PROCTOR_SUCCESS,
  payload,
});

export const createProctorFailure = ({
  payload,
}: CreateProctorFailurePayload) => ({
  type: actionTypes.CREATE_PROCTOR_SUCCESS,
  payload,
});
