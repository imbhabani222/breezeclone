import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import DataBarWrapper, { databarProps } from "../dataBarWrapper";
import progressBarWrapper from "../../progressBarWrapper/progressBarWrapper";
import constants from "../../../../constants/constants";
import ProgressBarWrapper from "../../progressBarWrapper/progressBarWrapper";
import { combineReducers, createStore } from "redux";
import { getTestDetails } from "../../../../reducers/assessmentReducer";
import { Provider } from "react-redux";
const { PROGRESSBAR_KEY } = constants;

describe("DatabarWrapper Testing", () => {
  const initialState = {
    pending: false,
    identity: [],
    error: null,
    timeLeft: 400,
  };

  const mock = {
    title: "apiTest",
    subTitle: "Hutech Dev",
    values: [
      {
        title: "apiTest",
        subTitle: "Hutech Dev",
      },
    ],
    type: "",
    image: "/logo.svg",
    alt: "some random string",
    className: "hutechlogo",
  };

  const fakeStore = createStore(
    combineReducers({ testDetails: getTestDetails }),
    {
      testDetails: initialState,
    }
  );
  fakeStore.dispatch = jest.fn((): any => {
    return mock;
  });

  const defaultProps: databarProps = {
    title: "",
    subTitle: "",
    image: "",
    alt: "",
    values: [],
    type: "",
    className: "",
  };

  function renderDatabarWrapper(props: Partial<databarProps> = {}) {
    return render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <DataBarWrapper {...defaultProps} {...props} />
        </BrowserRouter>
      </Provider>
    );
  }
  <DataBarWrapper {...{ ...defaultProps, title: "" }} />;
  afterEach(cleanup);
  test("Render without Crashing", () => {
    renderDatabarWrapper();
  });
  test("Match snapshot databarWrapper component", () => {
    const { asFragment } = renderDatabarWrapper();
    expect(asFragment()).toMatchSnapshot();
  });
  test("should not display databar wrapper", async () => {
    renderDatabarWrapper();
    expect(screen.queryByTitle(PROGRESSBAR_KEY)).not.toBeInTheDocument();
  });
  // test("should display databar wrapper", async () => {
  //   renderDatabarWrapper();
  //   expect(screen.queryByTitle(PROGRESSBAR_KEY)).not.toBeInTheDocument();
  // });
  test("display databar", async () => {
    renderDatabarWrapper(mock);
    expect(screen.getByTitle(mock.title)).toBeDefined();
    expect(screen.getByText(mock.subTitle)).toBeDefined();
  });
  test("renders the image src and alt name", () => {
    renderDatabarWrapper(mock);
    const image = screen.getByAltText("some random string");
    expect(screen.getByAltText(mock.alt)).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/logo.svg");
  });

  //Doubt
  test("Type image is string", () => {
    renderDatabarWrapper();
    // renderDatabarWrapper({ ...{ ...defaultProps, type: "" } });
    const logo = screen.getByTestId("imagediv");
    expect(logo).toHaveAttribute("src", "/logo.svg");
    expect(logo).toHaveAttribute("alt", "Logo");
  });
  //Doubt
  test("Type check for progressbar", () => {
    renderDatabarWrapper({ ...{ ...defaultProps, type: PROGRESSBAR_KEY } });
    const commentList = expect(screen.queryByTestId("databardiv")).toBe(
      <ProgressBarWrapper />
    );
    console.log(commentList, "common");
    expect(commentList).toBeTruthy();
  });
});

//EXAMPLES
// describe("Logo", () => {
//   test('Logo must have src = "/logo.svg" and alt = "Logo"', () => {
//     render(<Logo />);
//     const logo = screen.getByRole("img");
//     expect(logo).toHaveAttribute("src", "/logo.svg");
//     expect(logo).toHaveAttribute("alt", "Logo");
//   });
// });

// describe("<Image /> component", () => {
//   afterEach(cleanup);

// describe("Component as a whole", () => {
//   it("renders the image with a src, alt and a className ", () => {
//     const testProps = {
//       imageAlt: "some random string",
//       imageSrc: "" /* [ASK]: How to test this */,
//       className: "imageDescripton" /* [ASK]: How to test this */
//     };

//     const { getByAltText } = render(<Image {...testProps} />);
//     const { getByText } = render(<Image {...testProps} />);

//     const imageAltNode = getByAltText(testProps.imageAlt);
//     const imageClassNameNode = getByText(`${testProps.className}`); // [FAIL]: Fails with error.  Unable to find an element with the text: imageDescripton. Regex problem?

//     expect(imageAltNode).toBeDefined();
//     expect(imageClassNameNode).toBeDefined();
//   });
// });
// });
