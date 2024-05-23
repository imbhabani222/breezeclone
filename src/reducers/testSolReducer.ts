import actionTypes from "../constants/actionTypes/testSoulutionSetTypes";
import { TestSolActions } from "../types/testSolTypes";

const testSolInitialState: any = {
  loading: false,
  data: {},
  error: null
};
export const getTestSolDetails = (state = testSolInitialState, action: TestSolActions) => {
  switch (action.type) {
    case actionTypes.FETCH_TEST_SOLUTION:
      return {
        ...state,
        loading: true
      };
    case actionTypes.FETCH_TEST_SOLUTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.data
      };
    case actionTypes.FETCH_TEST_SOLUTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
