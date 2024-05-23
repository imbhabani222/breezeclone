import keyMirror from "keymirror";

const actionTypes = {
  FETCH_INIT_TEST: null,
  FETCH_INIT_TEST_SUCCESS: null,
  FETCH_INIT_TEST_FAILURE: null,

  FETCH_START_TEST: null,
  FETCH_START_TEST_SUCCESS: null,
  FETCH_START_TEST_FAILURE: null
};

export default keyMirror(actionTypes);
