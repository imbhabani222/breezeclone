import actionTypes from "../constants/actionTypes";

export interface IProblem {
  name: string;
  status: string;
  singleProblem: any;
}
export interface QuestionsState {
  pending: boolean;
  singleProblem: string;
  error: string | null;
}
export type FetchQuestionsSuccessPayload = {
  singleProblem: IProblem;
};
export type FetchQuestionsFailurePayload = {
  error: string;
};

export interface FetchSinglePrbSolPayload {
  data: any;
  statusCode: any;
}

export interface getSingleSolFailure {
  error: string;
  statusCode: any;
}

export interface getsingleProblemSolutionFailurePayload {
  error: string;
}

export type FetchQuestionsRequest = {
  type: typeof actionTypes.FETCH_QUESTIONS_REQUEST;
  problem_id: any;
  ids: any;
};
export type FetchQuestionsSuccess = {
  type: typeof actionTypes.FETCH_QUESTIONS_SUCCESS;
  payload: FetchQuestionsSuccessPayload;
};
export type FetchQuestionsFailure = {
  type: typeof actionTypes.FETCH_QUESTIONS_FAILURE;
  payload: FetchQuestionsFailurePayload;
};

export interface FetchSinglePrbSolRequest {
  type: typeof actionTypes.FETCH_SINGLE_PRB_SOL_REQUEST;
}
export interface FetchSinglePrbSolSuccess {
  type: typeof actionTypes.FETCH_SINGLE_PRB_SOL_SUCCESS;
  payload: any;
}
export interface FetchSinglePrbSolFailure {
  type: typeof actionTypes.FETCH_SINGLE_MCQ_SOL_FAILURE;
  payload: getSingleSolFailure;
}

// postAction go to reducer

export type McqPostState = {
  pending: boolean;
  McqSol: any;
  error: string | null;
};

export type QuestionsAction =
  | FetchQuestionsRequest
  | FetchQuestionsSuccess
  | FetchQuestionsFailure;

export type SinglePrbSol =
  | FetchSinglePrbSolRequest
  | FetchSinglePrbSolSuccess
  | FetchSinglePrbSolFailure;

export type PostSingleSolutionRequest = {
  type: typeof actionTypes.POST_SINGLE_PRB_SOL_REQUEST;
  platform: any;
  user: any;
  payload: any;
};

export type PostSingleSolutionPayload = any;

export type PostSolutionFailure = any;

export type PostSingleSuccess = {
  type: typeof actionTypes.POST_SINGLE_PRB_SOL_SUCCESS;
  payload: { data: any };
};

export type SinglePrbPostAction =
  | PostSingleSuccess
  | PostSolutionFailure
  | PostSingleSolutionRequest;

// DELETE ANSWER

export type DeleteAnswerSuccessPayload = any;
export type DeleteAnswerFailurePayload = any;

export type DeleteAnswerRequest = {
  type: typeof actionTypes.DELETE_ANSWER_REQUEST;
  delete_id: any;
  userName: any;
  payload: any;
};
export type DeleteAnswerSuccess = {
  type: typeof actionTypes.DELETE_ANSWER_SUCCESS;
  payload: { data: any };
};
export type DeleteAnswerFailure = {
  type: typeof actionTypes.DELETE_ANSWER_FAILURE;
  payload: { error: any };
};

export type DeleteQuestionsAction =
  | DeleteAnswerRequest
  | DeleteAnswerSuccess
  | DeleteAnswerFailure;
