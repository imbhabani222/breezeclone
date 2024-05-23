import keyMirror from "keymirror";

const actionTypes = {
  FETCH_IDENTITY: null,
  FETCH_IDENTITY_SUCCESS: null,
  FETCH_IDENTITY_FAILURE: null,

  TEST_DETAILS_REQUEST: null,
  TEST_DETAILS_SUCCESS: null,
  TEST_DETAILS_FAILURE: null,

  TECHNOLOGY_DETAILS_REQUEST: null,
  TECHNOLOGY_DETAILS_SUCCESS: null,
  TECHNOLOGY_DETAILS_FAILURE: null,
};

export default keyMirror(actionTypes);
