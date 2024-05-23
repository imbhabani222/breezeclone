import actionTypes from "../constants/actionTypes/assessmentActionsTypes";
import actionTypesTodo from "../constants/actionTypes";
export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoState {
  pending: boolean;
  todos: ITodo[];
  error: string | null;
}
export interface Identity {
  identity: string;
  usertype: string;
}
export interface IdentityState {
  pending: boolean;
  identity: Identity[];
  error: string | null;
  timeLeft: any;
  declarationStatus: boolean;
  modalStatus: boolean;
}
export interface TestDetails {
  testDetails: string;
}

export interface TestDetailsState {
  pending: boolean;
  testDetails: TestDetails[];
  error: string | null;
}
export interface FetchTodoSuccessPayload {
  todos: ITodo[];
}

export interface FetchTodoFailurePayload {
  error: string;
}

export interface FetchTodoRequest {
  type: typeof actionTypesTodo.FETCH_TODO_REQUEST;
}

export type FetchTodoSuccess = {
  type: typeof actionTypesTodo.FETCH_TODO_SUCCESS;
  payload: FetchTodoSuccessPayload;
};

export type FetchTodoFailure = {
  type: typeof actionTypesTodo.FETCH_TODO_FAILURE;
  payload: FetchTodoFailurePayload;
};
export interface FetchSampleRequest {
  type: typeof actionTypesTodo.SAMPLE_ACTION;
}

export interface FetchIdentitySuccessPayload {
  identity: Identity[];
}

export interface FetchIdentityPayload {
  identity: Identity[];
}
export interface TestDetails {
  identity: string;
}

export interface FetchTestDetailsSuccessPayload {
  slug: any;
  username: any;
}
export interface FetchIdentityFailurePayload {
  error: string;
}
export interface FetchIdentityRequest {
  type: typeof actionTypes.FETCH_IDENTITY;
}
export type FetchIdentityRequestSuccess = {
  type: typeof actionTypes.FETCH_IDENTITY_SUCCESS;
  payload: FetchIdentitySuccessPayload;
};

export type FetchIdentityRequestFailure = {
  type: typeof actionTypes.FETCH_IDENTITY_FAILURE;
  payload: FetchIdentityFailurePayload;
};

export interface FetchassessmentDetailsPayload {
  slug: any;
  username: any;
}

export type assessmentDetails = any;
export type assessmentState = any;
export type FetchAssesmentDetailsSuccess = any;
export type FetchAssesmentDetailsFailure = any;

export type FetchAssesmentDetailsRequest = {
  type: typeof actionTypes.TEST_DETAILS_REQUEST;
  slug: any;
  username: any;
};

export type FetchAssesmentDetailsSuccessPayload = any;
export type FetchAssesmentDetailsFailurePayload = any;
export type FetchAssesmentDetailsRequestPayload = {
  slug: any;
  username: any;
};

export type FetchTechnologyDetailsRequest = {
  type: typeof actionTypes.TECHNOLOGY_DETAILS_REQUEST;
};

export type FetchTechnologiesDetailsSuccessPayload = any;
export type FetchTechnologiesDetailsFailurePayload = any;

export type FetchTechnologiesDetailsSuccess = {
  type: typeof actionTypes.TECHNOLOGY_DETAILS_SUCCESS;
  payload: FetchTechnologiesDetailsSuccessPayload;
};
export type FetchTechnologiesDetailsFailure = {
  type: typeof actionTypes.TECHNOLOGY_DETAILS_FAILURE;
  payload: FetchTechnologiesDetailsFailurePayload;
};

export type TodoActions =
  | FetchTodoRequest
  | FetchTodoSuccess
  | FetchTodoFailure;

export type IdentityActions =
  | FetchIdentityRequest
  | FetchIdentityRequestSuccess
  | FetchIdentityRequestFailure;

export type TestDetailsActions =
  | FetchAssesmentDetailsRequest
  | FetchAssesmentDetailsSuccess
  | FetchAssesmentDetailsFailure;

export type TechnologyActions =
  | FetchTechnologyDetailsRequest
  | FetchTechnologiesDetailsSuccess
  | FetchTechnologiesDetailsFailure;
