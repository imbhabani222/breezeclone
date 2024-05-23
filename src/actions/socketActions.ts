import actionTypes from "../constants/actionTypes/socketActionTypes";
import { INIT, PROCTOR_INIT } from "../types/socketTypes";

export const socket_connect = (payload: INIT): any => ({
  type: actionTypes.WEBSOCKET_CONNECT,
  payload,
});

export const proctor_init = (payload: PROCTOR_INIT): any => ({
  type: actionTypes.PROCTOR_INIT,
  payload,
});

export const location_url_changed = (): any => ({
  type: actionTypes.LOCATION_URL_CHANGED,
});

export const focus = (): any => ({
  type: actionTypes.FOCUS,
});

export const blur = (): any => ({
  type: actionTypes.BLUR,
});

export const image_signed_url = (): any => ({
  type: actionTypes.GET_IMAGE_SIGNED_URL,
});

export const vid_url = (): any => ({
  type: actionTypes.VIDEO_URL,
});

export const code_async = (): any => ({
  type: actionTypes.CODE_ASYNC,
});

export const code_evaulated = (): any => ({
  type: actionTypes.CODE_EVALUATED,
});
