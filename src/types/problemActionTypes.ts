import actionTypes from "../constants/actionTypes";

export interface IProblem {
  name: string;
  status: string;
  problems: any;
}
export interface ProblemState {
  pending: boolean;
  allProblems: string;
  error: string | null;
}
export interface FetchProblemSuccessPayload {
  allProblems: IProblem;
}
export interface FetchProblemFailurePayload {
  error: string;
}
// SOLUTION SET
export interface ISolutionSet {
  name: string;
  status: string;
  problems: any;
}
export interface SolutionSetState {
  pending: boolean;
  allProblems: string;
  error: string | null;
  statusCode: any;
}
export interface FetchSolutionSetSuccessPayload {
  allProblems: SolutionSetState;
  statusCode: number;
}
export interface FetchSolutionSetFailurePayload {
  error: string;
  statusCode: Number;
}

export type FetchProblemRequest = {
  type: typeof actionTypes.FETCH_PROBLEM_REQUEST;
};
export type FetchProblemSuccess = {
  type: typeof actionTypes.FETCH_PROBLEM_SUCCESS;
  payload: FetchProblemSuccessPayload;
};
export type FetchProblemFailure = {
  type: typeof actionTypes.FETCH_PROBLEM_FAILURE;
  payload: FetchProblemFailurePayload;
};

// Get SOLUTION SET

export type FetchSolutionSetRequest = {
  type: typeof actionTypes.FETCH_SOLUTIONSET_REQUEST;
};
export type FetchSolutionSetSuccess = {
  type: typeof actionTypes.FETCH_SOLUTIONSET_SUCCESS;
  payload: FetchSolutionSetSuccessPayload;
};
export type FetchSolutionSetFailure = {
  type: typeof actionTypes.FETCH_SOLUTIONSET_FAILURE;
  payload: FetchSolutionSetFailurePayload;
};
export type SolutionSetAction =
  | FetchSolutionSetRequest
  | FetchSolutionSetSuccess
  | FetchSolutionSetFailure;

// POST Test

export interface PostTestState {
  pending: boolean;
  data: object;
  error: string | null;
}
export type PostTestRequest = {
  type: typeof actionTypes.POST_TEST_REQUEST;
  test_id: number;
  username: string;
};

export type PostTestSuccessPayload = any;
export type PostTestFailurePayload = any;

export type PostTestSuccess = {
  type: typeof actionTypes.POST_TEST_SUCCESS;
  payload: { data: object };
};
export type PostTestFailure = {
  type: typeof actionTypes.POST_TEST_FAILURE;
  payload: { error: object };
};

///section

export interface PostTestState {
  pending: boolean;
  data: object;
  error: string | null;
}
export type PostSectionRequest = {
  type: typeof actionTypes.POST_SECTION_REQUEST;
  platform: string;
  userName: string;
  payload: any;
};

export type PostSectionSuccessPayload = any;
export type PostSectionFailurePayload = any;

export type PostSectionSuccess = {
  type: typeof actionTypes.POST_SECTION_SUCCESS;
  payload: { data: object };
};
export type PostSectionFailure = {
  type: typeof actionTypes.POST_SECTION_FAILURE;
  payload: { error: object };
};

//SOLUTION SET

export type ProblemAction =
  | FetchProblemRequest
  | FetchProblemSuccess
  | FetchProblemFailure;

export type PostTestAction =
  | PostTestRequest
  | PostTestSuccess
  | PostTestFailure;

export type PostSectionAction =
  | PostSectionRequest
  | PostSectionSuccess
  | PostSectionFailure;
