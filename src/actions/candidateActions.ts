import actionTypes from "../constants/actionTypes/typeHackerRecruiter";

import {
  FetchRecruiterRequest,
  FetchRecruiterSuccess,
  FetchRecruiterSuccessPayload,
  FetchRecruiterFailure,
  FetchRecruiterFailurePayload,
  FetchHackerRequest,
  FetchHackerSuccess,
  FetchHackerSuccessPayload,
  FetchHackerFailure,
  FetchHackerFailurePayload,
  FetchUserTypeRequest,
  FetchUserTypeSuccess,
  FetchUserTypeSuccessPayload,
  FetchUserTypeFailure,
  FetchUserTypeFailurePayload,
} from "../types/candidateTypes";

export const fetchHackerActions = (
  user_id: any,
  username: any
): FetchHackerRequest => ({
  type: actionTypes.FETCH_HACKER,
  user_id,
  username,
});

export const fetchHackerActionsSuccess = (
  payload: FetchHackerSuccessPayload
): FetchHackerSuccess => ({
  type: actionTypes.FETCH_HACKER_SUCCESS,
  payload,
});

export const fetchHackerActionsFailure = (
  payload: FetchHackerFailurePayload
): FetchHackerFailure => ({
  type: actionTypes.FETCH_HACKER_FAILURE,
  payload,
});

export const fetchRecruiterActions = (
  user_id: any,
  username: any
): FetchRecruiterRequest => ({
  type: actionTypes.FETCH_RECRUITER,
  user_id,
  username,
});

export const fetchRecruiterActionsSuccess = (
  payload: FetchRecruiterSuccessPayload
): FetchRecruiterSuccess => ({
  type: actionTypes.FETCH_RECRUITER_SUCCESS,
  payload,
});
export const fetchRecruiterActionsFailure = (
  payload: FetchRecruiterFailurePayload
): FetchRecruiterFailure => ({
  type: actionTypes.FETCH_RECRUITER_FAILURE,
  payload,
});

export const fetchUserTypeActions = (
  user_type: any,
  user_id: any,
  username: any
): FetchUserTypeRequest => ({
  type: actionTypes.FETCH_USER_TYPE,
  user_type,
  user_id,
  username,
});

export const fetchUserTypeActionsSuccess = (
  payload: FetchUserTypeSuccessPayload
): FetchUserTypeSuccess => ({
  type: actionTypes.FETCH_USER_SUCCESS,
  payload,
});

export const fetchUserTypeActionsFailure = (
  payload: FetchUserTypeFailurePayload
): FetchUserTypeFailure => ({
  type: actionTypes.FETCH_USER_FAILURE,
  payload,
});
