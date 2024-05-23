import actionTypes from "../constants/actionTypes";
import { PatchAnswerActions } from "../types/patchAnswerTypes";

const initPatchState: any = {
  loading: false,
  data: {},
  error: null,
};

export const patchAnswerReducer = (
  state = initPatchState,
  action: PatchAnswerActions
) => {
  switch (action.type) {
    case actionTypes.PATCH_ANSWER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.PATCH_ANSWER_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data,
      };
    case actionTypes.PATCH_ANSWER_REQUEST_FAILURE:
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
