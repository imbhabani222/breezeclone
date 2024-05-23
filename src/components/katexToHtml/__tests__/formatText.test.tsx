import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import FormatText from "../formatText";

describe("formatText Testing", () => {
  function renderFormatText() {
    return render(<FormatText />);
  }

  afterEach(cleanup);
  test("Render without Crashing", () => {
    renderFormatText();
  });
  test("Match snapshot footer component", () => {
    const { asFragment } = renderFormatText();
    expect(asFragment()).toMatchSnapshot();
  });
});
