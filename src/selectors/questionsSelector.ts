import { createSelector } from "reselect";
import { AppState } from "../rootReducer";

const getQuestionsPending = (state: any) =>
  state.questions.questionsReducer.pending;
const getQuestions = (state: any) =>
  state.questions.questionsReducer.singleProblem;
const getQuestionsError = (state: any) => state.mcq.mcqReducer.error;

export const getPendingQuestionsSelector = createSelector(
  getQuestionsPending,
  (pending) => pending
);
export const getQuestionsSelector = createSelector(getQuestions, (val) => val);
export const getErrorQuestionsSelector = createSelector(
  getQuestionsError,
  (error) => error
);

//  Delete MCQ Option

const getDeleteAnswerPending = (state: AppState) =>
  state.questions.deleteQuestionsReducer.pending;
const getDeleteAnswer = (state: AppState) =>
  state.questions.deleteQuestionsReducer.data;
const getDeleteAnswerError = (state: AppState) =>
  state.questions.deleteQuestionsReducer.error;

export const getPendingDeleteProblemSelector = createSelector(
  getDeleteAnswerPending,
  (pending) => pending
);
export const getDeleteSelector = createSelector(
  getDeleteAnswer,
  (val) => val
);
export const getDeleteErrorProblemSelector = createSelector(
  getDeleteAnswerError,
  (error) => error
);

// questions post Data

export const getAnswerPostData = (state: any) =>
  state.postAnswer.postAnswerReducer.data;
export const getAnswerPostPending = (state: any) =>
  state.postAnswer.postAnswerReducer.pending;
export const getAnswerPostError = (state: any) =>
  state.postAnswer.postAnswerReducer.error;

export const getAnswerPostDataSelector = createSelector(
  getAnswerPostData,
  (val) => val
);
export const getAnswerPostPendingSelector = createSelector(
  getAnswerPostPending,
  (pending) => pending
);
export const getAnswerPostErrorSelector = createSelector(
  getAnswerPostError,
  (error) => error
);

/// Post section

export const getSectionPostData = (state: any) =>
  state.problem.postSectionReducer.data;
export const getSectionPostPending = (state: any) =>
  state.problem.postSectionReducer.Pending;
export const getSectionPostError = (state: any) =>
  state.problems.postSectionReducer.error;

export const getSectionPostDataSelector = createSelector(
  getSectionPostData,
  (val) => val
);
export const getSectionPostPendingSelector = createSelector(
  getSectionPostPending,
  (pending) => pending
);
export const getSectionPostErrorSelector = createSelector(
  getSectionPostError,
  (error) => error
);

/// Post section

export const getPatchAnswerData = (state: any) => state.patchAnswer.data;
export const getPatchAnswerPending = (state: any) => state.patchAnswer.loading;
export const getPatchAnswerError = (state: any) => state.patchAnswer.error;

export const getPatchAnswerDataSelector = createSelector(
  getPatchAnswerData,
  (val) => val
);
export const getPatchAnswerPendingSelector = createSelector(
  getPatchAnswerPending,
  (pending) => pending
);
export const getPatchAnswerErrorSelector = createSelector(
  getPatchAnswerError,
  (error) => error
);
