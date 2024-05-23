import actionTypes from "../constants/actionTypes/assessmentActionsTypes";

import {
  FetchIdentityRequest,
  FetchIdentityRequestSuccess,
  FetchIdentitySuccessPayload,
  FetchIdentityRequestFailure,
  FetchIdentityFailurePayload,
  FetchAssesmentDetailsFailure,
  FetchAssesmentDetailsFailurePayload,
  FetchAssesmentDetailsSuccess,
  FetchAssesmentDetailsSuccessPayload,
  FetchTechnologyDetailsRequest,
  FetchTechnologiesDetailsSuccess,
  FetchTechnologiesDetailsFailure,
  FetchTechnologiesDetailsSuccessPayload,
  FetchTechnologiesDetailsFailurePayload,
} from "../types/types";

export const fetchIdentityActions = (): FetchIdentityRequest => ({
  type: actionTypes.FETCH_IDENTITY,
});

export const fetchIdentityActionsSuccess = (
  payload: FetchIdentitySuccessPayload
): FetchIdentityRequestSuccess => ({
  type: actionTypes.FETCH_IDENTITY_SUCCESS,
  payload,
});

export const fetchIdentityActionsFailure = (
  payload: FetchIdentityFailurePayload
): FetchIdentityRequestFailure => ({
  type: actionTypes.FETCH_IDENTITY_FAILURE,
  payload,
});

export const fetchAssessmentDetails = (slug: any, username: any) => ({
  type: actionTypes.TEST_DETAILS_REQUEST,
  slug,
  username,
});

export const fetchAssesmentDetailsSuccess = (
  payload: FetchAssesmentDetailsSuccessPayload
): FetchAssesmentDetailsSuccess => ({
  type: actionTypes.TEST_DETAILS_SUCCESS,
  payload,
});
export const fetchAssessmentFailure = (
  payload: FetchAssesmentDetailsFailurePayload
): FetchAssesmentDetailsFailure => ({
  type: actionTypes.TEST_DETAILS_FAILURE,
  payload,
});

/////////

export const fetchTechnologiesDetails = (): FetchTechnologyDetailsRequest => ({
  type: actionTypes.TECHNOLOGY_DETAILS_REQUEST,
});

export const fetchTechnologiesDetailsSuccess = (
  payload: FetchTechnologiesDetailsSuccessPayload
): FetchTechnologiesDetailsSuccess => ({
  type: actionTypes.TECHNOLOGY_DETAILS_SUCCESS,
  payload,
});
export const fetchTechnologiesDetailsFailure = (
  payload: FetchTechnologiesDetailsFailurePayload
): FetchTechnologiesDetailsFailure => ({
  type: actionTypes.TECHNOLOGY_DETAILS_FAILURE,
  payload,
});
