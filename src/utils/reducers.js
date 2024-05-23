/* eslint-disable no-prototype-builtins */
export const createReducer = (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

export const getFetchingState = (state) => ({
  ...state,
  fetching: true,
  result: null,
  error: null,
});

export const getSuccessState = (state, { result }) => ({
  ...state,
  fetching: false,
  result: result.result || result,
  error: null,
});

export const getErrorState = (state, { error }) => ({
  ...state,
  fetching: false,
  result: null,
  error,
});

export const getResetState = (state) => ({
  ...state,
  fetching: false,
  result: null,
  error: null,
});

export const getActionInitialState = (state) => ({
  ...state,
});

export const getActionDefaultState = (state, { result: { data } }) => ({
  ...state,
  ...data,
});

export const checkAction = (state = {}, action) => {
  switch (action.type) {
    case "CHECK_ACTION": {
      console.log(state, action);
      return {
        data: { ...state.data, ...action.data },
      };
    }
    default:
      return state;
  }
};

export const customResult = (state = {}, action) => {
  switch (action.type) {
    case "GET_CUSTOM_RESULT": {
      console.log(state, action, "custommmmmmmmmm");
      return {
        data: { ...state.data, ...action.data },
      };
    }
    default:
      return state;
  }
};

export const testCasesResult = (state = {}, action) => {
  switch (action.type) {
    case "GET_TESTCASES_RESULT": {
      return {
        data: { ...state.data, ...action.data },
      };
    }
    default:
      return state;
  }
};
