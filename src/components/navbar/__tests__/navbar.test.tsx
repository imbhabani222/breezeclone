import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar, { NavbarProps } from "../navbar";
import messages from "../../../constants/messages";
import { combineReducers, createStore } from "redux";
import { getTestDetails } from "../../../reducers/assessmentReducer";
import { Provider } from "react-redux";
import VideoProctor from "../videoProctor/videoProctor";

const { HELP, LOGO, CAMERA, NETWORK, QUESTION, TIMER } = messages;

describe("Navbar", () => {
  const initialState = {
    loading: false,
    details: {},
    error: null,
  };

  const mocks = { timeLeft: 1645761486931 };

  const fakeStore = createStore(
    combineReducers({ testDetails: getTestDetails }),
    {
      testDetails: initialState,
    }
  );

  fakeStore.dispatch = jest.fn((): any => {
    return mocks;
  });
  // const ActualProctor = jest.requireActual("../videoProctor/videoProctor");
  // jest.mock("../videoProctor/videoProctor", () => (
  //   <div data-testid="video-proctor">
  //     <ActualProctor />
  //   </div>
  // ));

  const defaultProps: NavbarProps = {
    network: false,
    // que_label: false,
    // video_camera: false,
    // clock: false,
  };

  function renderNavbar(props: Partial<NavbarProps> = {}) {
    return render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <Navbar {...defaultProps} {...props} />
        </BrowserRouter>
      </Provider>
    );
  }

  afterEach(cleanup);
  test("snapshot matches with Navbar component", () => {
    const { asFragment } = renderNavbar();
    expect(asFragment()).toMatchSnapshot();
  });

  test("should display a plain navbar with no icons", async () => {
    renderNavbar();
    expect(screen.getByText(HELP)).toBeInTheDocument();
  });
  test("logo display test", async () => {
    renderNavbar();
    expect(screen.getByTitle(LOGO)).toBeInTheDocument();
  });
  test("do not display camera icon", async () => {
    renderNavbar();
    expect(screen.queryByTitle(CAMERA)).not.toBeInTheDocument();
  });
  test("display camera icon", async () => {
    renderNavbar({ video_camera: true });
    // expect(screen.getByTestId(/video-proctor/)).toBeInTheDocument();
    expect(screen.getByTitle(CAMERA)).toBeInTheDocument();
  });
  test("click on logo icon", async () => {
    renderNavbar();
    fireEvent(
      screen.getByTitle(LOGO),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });
  test("do not display network icon", async () => {
    renderNavbar();
    expect(screen.queryByTitle(NETWORK)).not.toBeInTheDocument();
  });
  test("display network icon", async () => {
    renderNavbar({ network: true });
    expect(screen.getByTitle(NETWORK)).toBeInTheDocument();
  });
  //display help button
  test("display help button", async () => {
    renderNavbar();
    expect(screen.getByText(HELP)).toBeInTheDocument();
  });
  //click help button
  test("click on help icon", async () => {
    renderNavbar();
    fireEvent(
      screen.getByTitle(HELP),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });
  // test("do not display all questions button", async () => {
  //   renderNavbar();
  //   expect(screen.queryByTitle(QUESTION)).not.toBeInTheDocument();
  // });
  //display all question
  test("display all questions button", async () => {
    renderNavbar();
    expect(screen.getByTitle(QUESTION)).toBeInTheDocument();
  });
  //click all question
  test("click on all questions icon", async () => {
    renderNavbar();
    fireEvent(
      screen.getByTitle(QUESTION),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });
  test("more content popover is not visible", () => {
    renderNavbar();
    const nullPopover = screen.queryByTestId("more-popover");
    expect(nullPopover).toBeInTheDocument();
  });
  test("more content popover is visible", async () => {
    renderNavbar();
    const handleClick = jest.fn();
    fireEvent.click(screen.getByTestId("more-popover"));
    // expect(handleClick).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("more-popover")).toHaveBeenCalledTimes(1);
    expect(await screen.findByTestId("more-popover")).toBeInTheDocument();
  });
  // test("do not display timer", async () => {
  //   renderNavbar();
  //   expect(screen.queryByTitle(TIMER)).not.toBeInTheDocument();
  // });
  // test("display timer", async () => {
  //   renderNavbar({ clock: true });
  //   expect(screen.getByTitle(TIMER)).toBeInTheDocument();
  // });
});
