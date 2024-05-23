import actionTypes from "../constants/actionTypes/assessmentActionsTypes";

import {
  assessmentDetails,
  assessmentState,
  IdentityActions,
  TestDetailsActions,
  IdentityState,
  TechnologyActions,
} from "../types/types";

const initialIdentity: IdentityState = {
  pending: false,
  identity: [],
  error: null,
  timeLeft: Date.now() + 904444,
  declarationStatus: false,
  modalStatus: false,
};
const initialState: assessmentState = {
  loading: false,
  details: {},
  error: null,
};
export const getIdentity = (
  state = initialIdentity,
  action: IdentityActions
) => {
  switch (action.type) {
    case actionTypes.FETCH_IDENTITY:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_IDENTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        identity: action.payload.identity,
        error: null,
      };
    case actionTypes.FETCH_IDENTITY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export const getTestDetails = (
  state = initialState,
  action: TestDetailsActions
) => {
  switch (action.type) {
    case actionTypes.TEST_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.TEST_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        details: action.payload.details,
      };
    case actionTypes.TEST_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export const getTechnologyDetails = (
  state = initialState,
  action: TechnologyActions
) => {
  switch (action.type) {
    case actionTypes.TECHNOLOGY_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.TECHNOLOGY_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        details: action.payload.details,
      };
    case actionTypes.TECHNOLOGY_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return {
        ...state,
      };
  }
};
