import React from "react";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import DataBar, { dataArray, dataProps, doublelineProps } from "../dataBar";
import { getTestDetails } from "../../../reducers/assessmentReducer";

describe("DatabarWrapper Testing", () => {
  const initialState = {
    pending: false,
    identity: [],
    error: null,
    timeLeft: 400,
  };
  // const mock = { timeLeft: 1645761486931 };
  const fakeStore = createStore(
    combineReducers({ testDetails: getTestDetails }),
    { testDetails: initialState }
  );

  // fakeStore.dispatch = jest.fn((): any => {
  //   return mock;
  // });
  const doublelineProps: doublelineProps = {
    title: "",
    subTitle: "",
  };
  const dataProps: dataProps = {
    title: "",
    subTitle: "",
    image: "",
    alt: "some",
    values: [doublelineProps],
    type: "",
    className: "",
    total: 67,
    completed: 60,
  };
  const defaultProps: dataArray = {
    id: 101,
    alignLeft: true,
    title: "",
    actionButton: "",
    data: [dataProps],
  };
  function renderDatabar(props: dataArray) {
    // console.log({ ...ButtondataProps, ...props });
    return render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <DataBar />
        </BrowserRouter>
      </Provider>
    );
  }

  afterEach(cleanup);
  console.log(renderDatabar(defaultProps));
  test("Render without Crashing", () => {
    renderDatabar(defaultProps);
  });
  test("Match snapshot databarWrapper component", () => {
    const { asFragment } = renderDatabar(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });
});
