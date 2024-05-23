import actionTypes from "../constants/actionTypes/systemActionsTypes";

import { SytemActionsState, SystemActions } from "../types/systmeActionsTypes";

const initialSystemState: SytemActionsState = {
  pending: false,
  error: null,
  timeLeft: Date.now() + 904444,
  declarationStatus: false,
  modalStatus: false,
  getVidSignedUrl: "",
};

export const getSystemActionData = (
  state = initialSystemState,
  action: SystemActions
) => {
  switch (action.type) {
    case actionTypes.SYSTEM_ACTION:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SYSTEM_ACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.SYSTEM_ACTION_FAILURE:
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
