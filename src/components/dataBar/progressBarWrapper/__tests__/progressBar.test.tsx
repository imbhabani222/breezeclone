import React from "react";
import { BrowserRouter } from "react-router-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ProgressDataBarWrapper from "../progressBarWrapper";
import constants from "../../../../constants/constants";
import { combineReducers, createStore } from "redux";
import messages from "../../../../constants/messages";
import { problemsReducer } from "../../../../reducers/problemReducer";
import { stringFiller } from "../../../../data/utils";
import { Provider } from "react-redux";

const { PROGRESSBAR_KEY } = constants;
const { PROGRESS_DATABAR_TEXT } = messages;
describe("ProgressBar Testing", () => {
  const mock = [
    {
      name: "Section 1",
      status: "",
      problems: [
        {
          id: 320603,
          name: "Dot Product M",
          problem_type: "MCQ",
          slug: "83p8o",
          solution: [1],
        },
      ],
    },
    {
      name: "Section 2",
      status: "",
      problems: [
        {
          id: 320603,
          name: "Dot Product M",
          problem_type: "MCQ",
          slug: "83p8o",
          solution: null,
        },
      ],
    },
  ];
  const initialState = {
    pending: false,
    allProblems: mock,
    error: null,
  };

  const fakeStore = createStore(
    combineReducers({ problem: problemsReducer } as any),
    {
      problem: initialState,
    }
  );
  console.log(fakeStore, "fakestore");
  fakeStore.dispatch = jest.fn((): any => {
    return mock;
  });

  function renderProgressDatabar() {
    return render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <ProgressDataBarWrapper />
        </BrowserRouter>
      </Provider>
    );
  }

  afterEach(cleanup);
  test("Render without Crashing", () => {
    renderProgressDatabar();
  });
  test("snapshot button component", () => {
    const { asFragment } = renderProgressDatabar();
    expect(asFragment()).toMatchSnapshot();
  });
  test("should display progressdatabar", async () => {
    renderProgressDatabar();
    // expect(screen.queryByText(PROGRESSBAR_KEY)).not.toBeInTheDocument();
    const wrap = stringFiller(PROGRESS_DATABAR_TEXT, {
      completed: 1,
      total: 1,
    });
    expect(screen.getByTitle("databartitle").innerHTML).toMatch(wrap);
  });

  //   test("display databar", async () => {
  //     renderProgressDatabar();
  //     expect(screen.getByText()).toBeInTheDocument();
  //   });
});
