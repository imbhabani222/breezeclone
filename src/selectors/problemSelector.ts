import { createSelector } from "reselect";

const getProblemPending = (state: any) => state.submitSection.pending;
const getProblem = (state: any) => state.problem.problemReducer.allProblems;
const getProblemError = (state: any) => state.problem.error;

export const getPendingQuestionsSelector = createSelector(
  getProblemPending,
  (pending) => pending
);
export const getProblemSelector = createSelector(getProblem, (val) => val);
export const getErrorQuestionsSelector = createSelector(
  getProblemError,
  (error) => error
);

// GET SOLUTION SET
const getSolutionSetPending = (state: any) =>
  state.problem.solutionSetReducer.pending;
const getSolutionSet = (state: any) =>
  state.problem.solutionSetReducer.allProblems;
const getSolutionSetError = (state: any) =>
  state.problem.solutionSetReducer.error;
const getSolutionSetStatusCode = (state: any) =>
  state.problem.solutionSetReducer.statusCode;

export const getPendingSolutionSetSelector = createSelector(
  getSolutionSetPending,
  (pending) => pending
);
export const getSolutionSetSelector = createSelector(
  getSolutionSet,
  (val) => val
);
export const getErrorSolutionSetSelector = createSelector(
  getSolutionSetError,
  (error) => error
);
export const getStatusCodeSolutionSetSelector = createSelector(
  getSolutionSetStatusCode,
  (statusCode) => statusCode
);
// POST TEST
const getPostTestPending = (state: any) => state.problem.pending;
const getPostTest = (state: any) => state.problem.postTestReducer.postTest;
const getPostTestError = (state: any) => state.problem.error;

export const getPendingPostTestSelector = createSelector(
  getPostTestPending,
  (pending) => pending
);
export const getPostTestSelector = createSelector(getPostTest, (val) => val);
export const getErrorPostTestSelector = createSelector(
  getPostTestError,
  (error) => error
);

//Upload Attachment
const getUploadFilePending = (state: any) => state.uploadAttachment.pending;
const getUploadFile = (state: any) => state.uploadAttachment.data;
const getUploadFileError = (state: any) => state.uploadAttachment.error;

export const getPendingUploadFileSelector = createSelector(
  getUploadFilePending,
  (pending) => pending
);
export const getUploadFileSelector = createSelector(
  getUploadFile,
  (val) => val
);
export const getErrorUploadFileSelector = createSelector(
  getUploadFileError,
  (error) => error
);
