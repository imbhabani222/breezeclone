import actionTypes from "../constants/actionTypes/fetchIdentityActionsTypes";
import { fetchIdentityImgActions } from "../types/fetchIdentityImgTypes";

const initialState = {
  loading: false,
  data: {},
  error: null,
};
export const fetchIdentityImg = (
  state = initialState,
  action: fetchIdentityImgActions
) => {
  switch (action.type) {
    case actionTypes.FETCH_IDENTITY_IMG:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_IDENTITY_IMG_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case actionTypes.FETCH_IDENTITY_IMG_FAILURE:
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
