import keyMirror from "keymirror";

const actionTypes = {
  FETCH_HACKER: null,
  FETCH_HACKER_SUCCESS: null,
  FETCH_HACKER_FAILURE: null,

  FETCH_RECRUITER: null,
  FETCH_RECRUITER_SUCCESS: null,
  FETCH_RECRUITER_FAILURE: null,

  FETCH_TEST_SOLUTION: null,
  FETCH_TEST_SOLUTION_SUCCESS: null,
  FETCH_TEST_SOLUTION_FAILURE: null,

  FETCH_USER_TYPE: null,
  FETCH_USER_SUCCESS: null,
  FETCH_USER_FAILURE: null,
};

export default keyMirror(actionTypes);
