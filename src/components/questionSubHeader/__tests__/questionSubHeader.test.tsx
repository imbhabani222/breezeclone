import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import QuestionHeader, { SubHeaderData } from "../QuestionSubHeader";
import listIcon from "../../../assets/list_item.svg";

describe("QuestionHeader Testing", () => {
  const handleClick = jest.fn();
  const defaultProps: SubHeaderData = {
    typeOfQuestions: "Fill In the Blanks",
    Icon: "list_item.svg",
    title: "Answer",
    text: "Please choose correct answer.",
    buttons: [
      {
        type: "rectFilled",
        display: "REPORT AN ISSUE",
        onClick: handleClick,
        beforeIcon: "beforeIcon",
      },
    ],
  };

  function renderQuestionHeader(props: SubHeaderData) {
    console.log({ ...defaultProps, ...props });
    return render(<QuestionHeader {...defaultProps} titles={props} />);
  }

  afterEach(cleanup);
  test("Render without Crashing", () => {
    renderQuestionHeader(defaultProps);
  });
  test("Match snapshot questionSubHeader component", () => {
    const { asFragment } = renderQuestionHeader(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });
  test("renders the icon src and alt name", () => {
    renderQuestionHeader({
      ...defaultProps,
      text: "Please choose correct question.",
    });
    console.log("change");
    const image = screen.getByAltText("Fill In the Blanks");
    expect(image).toHaveAttribute("src", "list_item.svg");
  });
  test("text is null", () => {
    renderQuestionHeader({
      ...defaultProps,
      text: "",
    });
    console.log("test");
  });
});

// test("click on button icon", async () => {
//   renderQuestionHeader(mock.buttons);
//   fireEvent(
//     screen.getByTestId("button-up"),
//     new MouseEvent("click", {
//       bubbles: true,
//       cancelable: true,
//     })
//   );
// });
