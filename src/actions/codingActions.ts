import actionTypes from "../constants/actionTypes";
import {
  FetchLanguageSuccessPayload,
  FetchLanguageFailurePayload,
  RunCodeWithCustomInputPayload,
  RunCodeWithCustomInputSuccessPayload,
  RunCodeWithCustomInputFailurePayload,
  PostSolutionsSubmitWithPayload,
  PostSolutionsSubmitSuccessPayload,
  PostSolutionsSubmitFailurePayload,
  RunCodeWithCustomInputResultSuccessPayload,
} from "../types/codingActionTypes";

export const fetchLanguageRequest = (language: any) => ({
  type: actionTypes.GET_LANGUAGE_REQUEST,
  language,
});

export const fetchLanguageSuccess = ({
  payload,
}: FetchLanguageSuccessPayload) => ({
  type: actionTypes.GET_LANGUAGE_SUCCESS,
  payload,
});

export const fetchLanguageFailure = ({
  payload,
}: FetchLanguageFailurePayload) => ({
  type: actionTypes.GET_LANGUAGE_FAILURE,
  payload,
});

///////////////
export const runCodeWithCustomInputRequest = (
  problemType: string,
  payload: any
): RunCodeWithCustomInputPayload => ({
  type: actionTypes.RUN_CODE_CUSTOM_INPUT_REQUEST,
  problemType,
  payload,
});

export const runCodeWithCustomInputSuccess = (
  payload: RunCodeWithCustomInputSuccessPayload
) => ({
  type: actionTypes.RUN_CODE_CUSTOM_INPUT_SUCCESS,
  payload,
});

export const runCodeWithCustomInputFailure = ({
  payload,
}: RunCodeWithCustomInputFailurePayload) => ({
  type: actionTypes.RUN_CODE_CUSTOM_INPUT_FAILURE,
  payload,
});

/////////////////////////////////
export const runCodeWithCustomInputResult = (
  payload: RunCodeWithCustomInputResultSuccessPayload
) => ({
  type: actionTypes.RUN_CODE_CUSTOM_INPUT_RESULT,
  payload,
});

///postSolutionsSubmit

export const postSolutionsSubmitRequest = (
  payload: any,
  username: string
): PostSolutionsSubmitWithPayload => ({
  type: actionTypes.TESTCASES_RUN_CODE__REQUEST,
  payload,
  username,
});

export const postSolutionsSubmitSuccess = (
  payload: PostSolutionsSubmitSuccessPayload
) => ({
  type: actionTypes.TESTCASES_RUN_CODE__SUCCESS,
  payload,
});

export const postSolutionsSubmitFailure = ({
  payload,
}: PostSolutionsSubmitFailurePayload) => ({
  type: actionTypes.TESTCASES_RUN_CODE__FAILURE,
  payload,
});
