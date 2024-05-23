import actionTypes from "../constants/actionTypes";
import { ServerTimeAction, ServerTimeState } from "../types/getServerTimeTypes";

const initialStateServerTime: ServerTimeState = {
  pending: false,
  server_time: "",
  error: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialStateServerTime, action: ServerTimeAction) => {
  switch (action.type) {
    case actionTypes.FETCH_SERVER_TIME_REQUEST:
      return {
        ...state,
        pending: true
      };
    case actionTypes.FETCH_SERVER_TIME_SUCCESS:
      return {
        ...state,
        pending: false,
        server_time: action.payload.serverTime,
        error: null
      };
    case actionTypes.FETCH_SERVER_TIME_FAILURE:
      return {
        ...state,
        pending: false,
        server_time: "",
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
