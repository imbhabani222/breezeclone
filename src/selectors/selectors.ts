import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const assessment = (state: AppState) => state.assessmentPage;
export const getassessment = createSelector(
  assessment,
  (assessment) => assessment
);

const identityPending = (state: AppState) => state.assessmentPage.pending;
const identityError = (state: AppState) => state.assessmentPage.error;
const identity = (state: AppState) => state.assessmentPage.identity;

export const getIdentity = createSelector(identity, (identity) => identity);

export const getIdentityPending = createSelector(
  identityPending,
  (pending) => pending
);

export const getIdentityError = createSelector(identityError, (error) => error);

const testPending = (state: AppState) => state.testDetails.loading;
const testError = (state: AppState) => state.testDetails.error;
const testDetails = (state: AppState) => state.testDetails.details;

export const getTest = createSelector(
  testDetails,
  (testDetails) => testDetails
);

export const getTestPending = createSelector(testPending, (pending) => pending);

export const getTestError = createSelector(testError, (error) => error);

const technologyPending = (state: AppState) => state.technologies.loading;
const technologyError = (state: AppState) => state.technologies.error;
const technologyDetails = (state: AppState) => state.technologies.details;

export const getTechnology = createSelector(
  technologyDetails,
  (testDetails) => testDetails
);

export const getTechnologyPending = createSelector(
  technologyPending,
  (pending) => pending
);

export const getTechnologyError = createSelector(
  technologyError,
  (error) => error
);

const recruiterPending = (state: AppState) =>
  state.candidateDetails.getRecruiterDetails.pending;
const recruiterError = (state: AppState) =>
  state.candidateDetails.getRecruiterDetails.error;
const recruiterDetails = (state: AppState) =>
  state.candidateDetails.getRecruiterDetails.data;

export const getRecruiter = createSelector(
  recruiterDetails,
  (recruiterDetails) => recruiterDetails
);

export const getRecruiterPending = createSelector(
  recruiterPending,
  (pending) => pending
);

export const getRecruiterError = createSelector(
  recruiterError,
  (error) => error
);

const userTypePending = (state: AppState) =>
  state.candidateDetails.getUserType.pending;
const userTypeError = (state: AppState) =>
  state.candidateDetails.getUserType.error;
const userTypeDetails = (state: AppState) =>
  state.candidateDetails.getUserType.data;

export const getUserTypeData = createSelector(
  userTypeDetails,
  (userTypeDetails) => userTypeDetails
);

export const getUserTypePending = createSelector(
  userTypePending,
  (pending) => pending
);

export const getUserTypeError = createSelector(userTypeError, (error) => error);

const solutionSetPending = (state: AppState) =>
  state.candidateDetails.getCandidateSolSet.loading;
const solutionSetError = (state: AppState) =>
  state.candidateDetails.getCandidateSolSet.error;
const solutionSetDetails = (state: AppState) =>
  state.candidateDetails.getCandidateSolSet.data;

export const getsolutionSet = createSelector(
  solutionSetDetails,
  (solutionSetDetails) => solutionSetDetails
);
export const getsolutionSetPending = createSelector(
  solutionSetPending,
  (pending) => pending
);
export const getsolutionSetError = createSelector(
  solutionSetError,
  (error) => error
);

const inItPending = (state: AppState) =>
  state.initTestDetails.getInitTestDetails.loading;
const inItError = (state: AppState) =>
  state.initTestDetails.getInitTestDetails.error;
const inItDetails = (state: AppState) =>
  state.initTestDetails.getInitTestDetails.data;

export const getinItSet = createSelector(
  inItDetails,
  (inItDetails) => inItDetails
);
export const getinItPending = createSelector(inItPending, (pending) => pending);
export const getinItError = createSelector(inItError, (error) => error);

export const getsingleSol = (state: any) =>
  state.checkSingleProblemSol.data.data;
export const getsingleSolError = (state: any) =>
  state.checkSingleProblemSol.statusCode;
export const getsingleSolPending = (state: any) =>
  state.checkSingleProblemSol.pending;
export const getSingleSolStatusCode = (state: any) =>
  state.checkSingleProblemSol.statusCode;

export const getSingleSolState = createSelector(
  getsingleSol,
  (solution) => solution
);
export const getSingleSolStatePending = createSelector(
  getsingleSolPending,
  (pending) => pending
);
export const getSingleChoiceSolState = createSelector(
  getSingleSolStatusCode,
  (status) => status
);

export const getSingleSolStateError = createSelector(
  getsingleSolError,
  (error) => error
);
const checkAction = (state: AppState) => state.systemAction;
export const getcheckAction = createSelector(
  checkAction,
  (checkAction) => checkAction
);

const customResult = (state: AppState) => state.customResult;
export const getCustomResult = createSelector(customResult, (val) => val);

const testCasesResult = (state: AppState) => state.testResult;
export const getTestCasesResult = createSelector(testCasesResult, (val) => val);

export const getPostFeedback = (state: any) =>
  state.postFeedback.postFeedbackReducer;
export const getPostFeedbackError = (state: any) =>
  state.postFeedback.postFeedbackReducer.error;
export const getPostFeedbackPending = (state: any) =>
  state.postFeedback.postFeedbackReducer.loading;

export const getPostStateFeedback = createSelector(
  getsingleSol,
  (solution) => solution
);
export const getPostFeedbackStatePending = createSelector(
  getsingleSolPending,
  (pending) => pending
);

const testStartDetails = (state: AppState) =>
  state.initTestDetails.getStartTestDetails.data;
export const getTestStartDetails = createSelector(
  testStartDetails,
  (testStartDetails) => testStartDetails
);
const testStartError = (state: AppState) =>
  state.initTestDetails.getStartTestDetails.error;
export const gettestStartError = createSelector(
  testStartError,
  (error) => error
);

const postReportIssuePending = (state: any) => state.reportIssue.data;
const postReportIssueError = (state: any) => state.reportIssue.error;
const postReportIssueBDetails = (state: any) => state.reportIssue.data;

export const getpostReportIssuePending = createSelector(
  postReportIssuePending,
  (pending) => pending
);
export const getpostReportIssue = createSelector(
  postReportIssueBDetails,
  (data) => data
);
export const getpostReportIssueError = createSelector(
  postReportIssueError,
  (error) => error
);

//Identity Image
const indentityImgPending = (state: any) => state.identityImage.loading;
const indentityImgError = (state: any) => state.identityImage.error;
const indentityImgDetails = (state: any) => state.identityImage.data;

export const getindentityImg = createSelector(
  indentityImgDetails,
  (indentityImgDetails) => indentityImgDetails
);

export const getindentityImgPending = createSelector(
  indentityImgPending,
  (pending) => pending
);

export const getindentityImgError = createSelector(
  indentityImgError,
  (error) => error
);
//Fetch Identity Image
const fetchIndentityImgPending = (state: any) => state.getIdentityImage.loading;
const fetchIndentityImgError = (state: any) => state.getIdentityImage.error;
const fetchIndentityImgDetails = (state: any) => state.getIdentityImage.data;

export const fetchIndentityImg = createSelector(
  fetchIndentityImgDetails,
  (fetchIndentityImgDetails) => fetchIndentityImgDetails
);

export const fetchIdentityImgPending = createSelector(
  fetchIndentityImgPending,
  (pending) => pending
);

export const fetchIndentityImageError = createSelector(
  fetchIndentityImgError,
  (error) => error
);

// fetch CodeLang
const fetchLanguagePending = (state: any) => state.language.loading;
const fetchLanguageError = (state: any) => state.language.error;
const fetchLanguage = (state: any) => state.language.data;

export const fetchLanguageSelector = createSelector(
  fetchLanguage,
  (val) => val
);

export const fetchLanguageSelectorPending = createSelector(
  fetchLanguagePending,
  (pending) => pending
);

export const fetchLanguageSelectorError = createSelector(
  fetchLanguageError,
  (error) => error
);

//Post Run code Custom
const fetchRunCodeCustomPending = (state: any) => state.runCodeCustom.loading;
const fetchRunCodeCustomError = (state: any) => state.runCodeCustom.error;
const fetchRunCodeCustom = (state: any) => state.runCodeCustom.data;

const fetchRunCodeCustomResult = (state: any) => state.runCodeCustomResult.data;

export const fetchRunCodeCustomResultSelector = createSelector(
  fetchRunCodeCustomResult,
  (val) => val
);

export const fetchRunCodeCustomSelector = createSelector(
  fetchRunCodeCustom,
  (val) => val
);

export const fetchRunCodeCustomSelectorPending = createSelector(
  fetchRunCodeCustomPending,
  (pending) => pending
);

export const fetchRunCodeCustomSelectorError = createSelector(
  fetchRunCodeCustomError,
  (error) => error
);

/////POST SOLUTION SUBMIT
const fetchPostSolutionSubmitPending = (state: any) =>
  state.postSolutionsSubmit.pending;
const fetchPostSolutionSubmitError = (state: any) =>
  state.postSolutionsSubmit.error;
const fetchPostSolutionSubmit = (state: any) => state.postSolutionsSubmit.data;

export const fetchPostSolutionSubmitSelector = createSelector(
  fetchPostSolutionSubmit,
  (val) => val
);

export const fetchPostSolutionSubmitSelectorPending = createSelector(
  fetchPostSolutionSubmitPending,
  (pending) => pending
);

export const fetchPostSolutionSubmitSelectorError = createSelector(
  fetchPostSolutionSubmitError,
  (error) => error
);

// get video url

const getVideoUrlPending = (state: any) => state.videoSignedUrl.loading;
const getVideoUrlError = (state: any) => state.videoSignedUrl.error;
const getVideoUrlonSubmit = (state: any) => state.videoSignedUrl.data;

export const getVideoUrlSelector = createSelector(
  getVideoUrlonSubmit,
  (val) => val
);

export const getVideoUrlPendingSelector = createSelector(
  getVideoUrlPending,
  (pending) => pending
);

export const getVideoUrlErrorSelector = createSelector(
  getVideoUrlError,
  (error) => error
);
