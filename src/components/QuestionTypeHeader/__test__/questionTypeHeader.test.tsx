import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import QuestionTypeHeader from "../QuestionTypeHeader";

describe("Button Group Testing", () => {
  //   const handleClick = jest.fn();
  //   const defaultProps: ButtonProps = {
  //     className: "Clear",
  //     display: "Clear",
  //     type: "submit",
  //     onClick: handleClick,
  //     beforeIcon: "beforeIcon",
  //     afterIcon: "afterIcon",
  //     disabled: true,
  //   };

  //   const ButtondataProps: ButtonArrayProps = {
  //     buttons: [defaultProps],
  //     className: "footer_btn_div",
  //   };
  function renderQuestionTypeHeader() {
    return render(<QuestionTypeHeader />);
  }

  afterEach(cleanup);

  test("Render without Crashing", () => {
    renderQuestionTypeHeader();
  });
  test("Match snapshot QuestionTypeHeader component", () => {
    const { asFragment } = renderQuestionTypeHeader();
    expect(asFragment()).toMatchSnapshot();
  });
});
