import actionTypes from "../constants/actionTypes";

export type FetchLanguageSuccessPayload = any;

export type FetchLanguageFailurePayload = any;

export type FetchLanguageRequest = {
  type: typeof actionTypes.GET_LANGUAGE_REQUEST;
};
export type FetchLanguageSuccess = {
  type: typeof actionTypes.GET_LANGUAGE_SUCCESS;
  payload: FetchLanguageSuccessPayload;
};
export type FetchLanguageFailure = {
  type: typeof actionTypes.GET_LANGUAGE_FAILURE;
  payload: FetchLanguageFailurePayload;
};

export type LanguageAction =
  | FetchLanguageRequest
  | FetchLanguageSuccess
  | FetchLanguageFailure;

///////////////////
export type RunCodeWithCustomInputPayload = {
  type: string;
  problemType: string;
  payload: object | Array<string>;
};

export type RunCodeWithCustomInputSuccessPayload = any;
export type RunCodeWithCustomInputFailurePayload = any;

export type RunCodeWithCustomInputResultSuccessPayload = any;

export type RunCodeCustomResultSuccess = {
  type: typeof actionTypes.RUN_CODE_CUSTOM_INPUT_RESULT;
  payload: { data: object };
};

export type RunCodeRequest = {
  type: typeof actionTypes.RUN_CODE_CUSTOM_INPUT_REQUEST;
};

export type RunCodeRequestSuccess = {
  type: typeof actionTypes.RUN_CODE_CUSTOM_INPUT_SUCCESS;
  payload: any;
};
export type RunCodeRequestFailure = {
  type: typeof actionTypes.RUN_CODE_CUSTOM_INPUT_FAILURE;
  payload: any;
};

export type RunCodeCustomResult = RunCodeCustomResultSuccess;

export type RunCodeCustomAction =
  | RunCodeRequest
  | RunCodeRequestSuccess
  | RunCodeRequestFailure;

/////Test cases Run Code

export type PostSolutionsSubmitWithPayload = {
  type: string;
  payload: object | Array<string>;
  username: string;
};

export type PostSolutionsSubmitSuccessPayload = any;
export type PostSolutionsSubmitFailurePayload = any;

export type PostSolutionsSubmitRequest = {
  type: typeof actionTypes.TESTCASES_RUN_CODE__REQUEST;
};

export type PostSolutionsSubmitRequestSuccess = {
  type: typeof actionTypes.TESTCASES_RUN_CODE__SUCCESS;
  payload: { data: object };
};
export type PostSolutionsSubmitRequestFailure = {
  type: typeof actionTypes.TESTCASES_RUN_CODE__FAILURE;
  payload: { error: object | string };
};

export type PostSolutionsSubmitAction =
  | PostSolutionsSubmitRequest
  | PostSolutionsSubmitRequestSuccess
  | PostSolutionsSubmitRequestFailure;
