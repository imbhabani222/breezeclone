import React from "react";
import { BrowserRouter } from "react-router-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import AssessmentInstruction from "../assessmentInstruction";
import { combineReducers, createStore } from "redux";
import { getIdentity } from "../../../../reducers/assessmentReducer";
import { Provider } from "react-redux";
import { problemsReducer } from "../../../../reducers/problemReducer";
import { combineReducer } from "../../../../reducers/candidateTypeReducer";
import { combineInitAndStart } from "../../../../reducers/initTestReducer";
import { checkAction } from "../../../../utils/reducers";

const initialIdentity = {
  pending: false,
  identity: [],
  error: null,
  timeLeft: Date.now() + 904444,
  declarationStatus: false,
  modalStatus: false,
};

const initialStateProblem = {
  pending: false,
  allProblems: "",
  error: null,
};
const recruiterInitialState: any = {
  loading: false,
  data: {},
  error: null,
};
const initTestInitialState: any = {
  loading: false,
  data: {},
  error: null,
};

const mock = { timeLeft: 1645761486931 };

const fakeStore =
  // createStore(combineReducers(rootReducer, initialState))
  createStore(
    combineReducers({
      assessmentPage: getIdentity,
      problem: problemsReducer,
      candidateDetails: combineReducer,
      initTestDetails: combineInitAndStart,
      systemAction: checkAction,
    }),
    {
      assessmentPage: initialIdentity,
      // problem: initialStateProblem,
      // candidateDetails: recruiterInitialState,
      // initTestDetails: initTestInitialState,
      // systemAction: [],
    }
  );

fakeStore.dispatch = jest.fn((): any => {
  return mock;
});

describe("Assessment Instruction", () => {
  function renderassessmentInstruction() {
    return render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <AssessmentInstruction />
        </BrowserRouter>
      </Provider>
    );
  }
  afterEach(cleanup);
  test("Render without Crashing", () => {
    renderassessmentInstruction();
  });
  test("Match snapshot assessment component", () => {
    const { asFragment } = renderassessmentInstruction();
    expect(asFragment()).toMatchSnapshot();
  });
});
