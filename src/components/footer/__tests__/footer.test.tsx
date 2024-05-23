import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import Footer from "../footer";
import messages from "../../../constants/messages";

const { DO_SELECT_RESEVE_RIGHTS } = messages;
const date: number = new Date().getFullYear();

describe("Footer", () => {
  function renderFooter(props: typeof date = date) {
    return render(<Footer />);
  }

  afterEach(cleanup);
  test("Render without Crashing", () => {
    renderFooter();
  });
  test("Match snapshot footer component", () => {
    const { asFragment } = renderFooter();
    expect(asFragment()).toMatchSnapshot();
  });
  // test("display current date", async () => {
  //   renderFooter();
  //   expect(screen.getByText(date)).toBeInTheDocument();
  // });
  test("display a Footer Content", async () => {
    renderFooter();
    expect(screen.getByTitle(DO_SELECT_RESEVE_RIGHTS)).toBeInTheDocument();
  });
});
