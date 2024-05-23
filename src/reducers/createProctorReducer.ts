import actionTypes from "../constants/actionTypes/createProctorActionsTypes";
import { createProctorActions } from "../types/createProctorTypes";

const initialState = {
  loading: false,
  data: {},
  error: null,
};
export const createProctor = (
  state = initialState,
  action: createProctorActions
) => {
  switch (action.type) {
    case actionTypes.CREATE_PROCTOR:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE_PROCTOR_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case actionTypes.CREATE_PROCTOR_FAILURE:
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
