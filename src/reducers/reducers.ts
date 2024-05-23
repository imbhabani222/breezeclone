import actionTypes from "../constants/actionTypes";

import { TodoActions, TodoState } from "../types/types";

const initialState: TodoState = {
  pending: false,
  todos: [],
  error: null
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action: TodoActions) => {
  switch (action.type) {
    case actionTypes.FETCH_TODO_REQUEST:
      return {
        ...state,
        pending: true
      };
    case actionTypes.FETCH_TODO_SUCCESS:
      return {
        ...state,
        pending: false,
        todos: action.payload.todos,
        error: null
      };
    case actionTypes.FETCH_TODO_FAILURE:
      return {
        ...state,
        pending: false,
        todos: [],
        error: action.payload.error
      };
    default:
      return {
        ...state
      };
  }
};
