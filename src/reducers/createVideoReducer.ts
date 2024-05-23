import actionTypes from "../constants/actionTypes/createVideoActionTypes";
import { createVideoActions } from "../types/createVideoTypes";

const initialState = {
  loading: false,
  data: {},
  error: null,
};
export const createVideoUrl = (
  state = initialState,
  action: createVideoActions
) => {
  switch (action.type) {
    case actionTypes.CREATE_VIDEO:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.CREATE_VIDEO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case actionTypes.CREATE_VIDEO_FAILURE:
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
