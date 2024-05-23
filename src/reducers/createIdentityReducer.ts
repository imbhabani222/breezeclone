import actionTypes from "../constants/actionTypes/createIdentityActionsTypes";
import { createIdentityActions } from "../types/createIdentityTypes";

const initialState = {
  loading: false,
  data: {},
  error: null,
};
export const createIdentity = (
  state = initialState,
  action: createIdentityActions
) => {
  switch (action.type) {
    case actionTypes.CREATE_IDENTITY:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE_IDENTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case actionTypes.CREATE_IDENTITY_FAILURE:
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
