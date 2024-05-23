import keyMirror from "keymirror";

const actionTypes = {
  WEBSOCKET_CONNECT: null,
  WEBSOCKET_CONNECT_SUCCESS: null,
  PROCTOR_INIT: "PROCTOR_INIT",
  LOCATION_URL_CHANGED: "LOCATION_URL_CHANGED",
  FOCUS: "FOCUS",
  BLUR: "BLUR",
  GET_IMAGE_SIGNED_URL: "GET_IMAGE_SIGNED_URL",
  IMAGE_SIGNED_URL: "IMAGE_SIGNED_URL",
  VIDEO_URL: "VID_URL",
  VIDEO_URL_SUCCESS: "VID_URL",
  CODE_ASYNC: "code_async",
  CODE_ASYNC_SUCCESS: "code_async",
  CODE_EVALUATED: "code_evaulated",
  CODE_EVALUATED_SUCCESS: "code_evaulated",
  FETCH_SETTINGS: null,
};

export default keyMirror(actionTypes);
