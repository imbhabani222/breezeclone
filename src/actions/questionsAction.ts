import actionTypes from "../constants/actionTypes";

import {
  FetchQuestionsRequest,
  FetchQuestionsFailure,
  FetchQuestionsFailurePayload,
  FetchQuestionsSuccess,
  FetchQuestionsSuccessPayload,
  FetchSinglePrbSolRequest,
  FetchSinglePrbSolPayload,
  FetchSinglePrbSolFailure,
  getSingleSolFailure,
} from "../types/questionsActionTypes";

import {
  DeleteAnswerSuccess,
  DeleteAnswerFailure,
  DeleteAnswerFailurePayload,
  DeleteAnswerSuccessPayload,
  DeleteAnswerRequest,
} from "../types/questionsActionTypes";

export const questionsActions = (
  problem_id: number,
  ...ids: Array<Number>
): FetchQuestionsRequest => ({
  type: actionTypes.FETCH_QUESTIONS_REQUEST,
  problem_id,
  ids,
});

export const fetchQuestionsSuccess = (
  payload: FetchQuestionsSuccessPayload
): FetchQuestionsSuccess => ({
  type: actionTypes.FETCH_QUESTIONS_SUCCESS,
  payload,
});

export const fetchQuestionsFailure = (
  payload: FetchQuestionsFailurePayload
): FetchQuestionsFailure => ({
  type: actionTypes.FETCH_QUESTIONS_FAILURE,
  payload,
});

//Get Single MCQ Question Sol
export const getSingleProblemSolRequest = (): FetchSinglePrbSolRequest => ({
  type: actionTypes.FETCH_SINGLE_PRB_SOL_REQUEST,
});

export const getSingleProblemSolSuccess = (
  payload: FetchSinglePrbSolPayload
) => ({
  type: actionTypes.FETCH_SINGLE_PRB_SOL_SUCCESS,
  payload,
});

export const getSingleProblemSolFailure = (
  payload: getSingleSolFailure
): FetchSinglePrbSolFailure => ({
  type: actionTypes.FETCH_SINGLE_MCQ_SOL_FAILURE,
  payload,
});

export const getSingleProblemSolAction = (
  userType: string,
  user_id: number,
  platform: string,
  username: any,
  context_slug: string,
  problem_slug: any
) => ({
  type: actionTypes.FETCH_SINGLE_PRB_SOL_REQUEST,
  userType,
  user_id,
  platform,
  username,
  context_slug,
  problem_slug,
});

//DELETE MCQ

export const deleteAnswerAction = (
  delete_id: number,
  userName: string,
  payload: any
): DeleteAnswerRequest => ({
  type: actionTypes.DELETE_ANSWER_REQUEST,
  delete_id,
  userName,
  payload,
});

export const deleteAnswerActionSuccess = (
  payload: DeleteAnswerSuccessPayload
): DeleteAnswerSuccess => ({
  type: actionTypes.DELETE_ANSWER_SUCCESS,
  payload,
});

export const deleteAnswerActionFailure = (
  payload: DeleteAnswerFailurePayload
): DeleteAnswerFailure => ({
  type: actionTypes.DELETE_ANSWER_FAILURE,
  payload,
});
