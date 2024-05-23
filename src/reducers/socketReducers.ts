import actionTypes from "../constants/actionTypes/socketActionTypes";
import { INITIAL_STATE } from "../types/socketTypes";

const initialState: INITIAL_STATE = {
  connected: false,
  vid_url: "",
  vid_url_fetching: false,
  image_url: "",
  image_url_fetching: false,
  code_async: null,
  code_evaulated: null,
  pending: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.WEBSOCKET_CONNECT:
      return {
        ...state,
        pending: true,
      };
    case actionTypes.WEBSOCKET_CONNECT_SUCCESS:
      return {
        ...state,
        pending: false,
        connected: true,
      };
    case actionTypes.GET_IMAGE_SIGNED_URL:
      return {
        ...state,
        image_url_fetching: true,
      };
    case actionTypes.IMAGE_SIGNED_URL:
      return {
        ...state,
        image_url_fetching: false,
        image_url: action.payload,
      };
    case actionTypes.VIDEO_URL:
      return {
        ...state,
        vid_url_fetching: true,
      };
    case actionTypes.VIDEO_URL_SUCCESS:
      return {
        ...state,
        vid_url_fetching: false,
        vid_url: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
