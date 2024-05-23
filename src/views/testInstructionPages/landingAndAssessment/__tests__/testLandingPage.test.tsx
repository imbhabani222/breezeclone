import React from "react";
import { BrowserRouter } from "react-router-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import TestLandingPage from "../testLandingPage";

describe("Assessment Instruction", () => {
  function renderTestLandingPage() {
    return render(
      <BrowserRouter>
        <TestLandingPage />
      </BrowserRouter>
    );
  }
  afterEach(cleanup);
  test("Render without Crashing", () => {
    renderTestLandingPage();
  });
  test("Match snapshot logo component", () => {
    const { asFragment } = renderTestLandingPage();
    expect(asFragment()).toMatchSnapshot();
  });
});
