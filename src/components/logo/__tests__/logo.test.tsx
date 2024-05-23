import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Logo from "../logo";
import messages from "../../../constants/messages";
import constants from "../../../constants/constants";
const { LOGO } = messages;
const {
  ROUTE: { LANDING_PAGE },
} = constants;

describe("Logo", () => {
  function renderLogo() {
    return render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );
  }
  let location = useLocation();
  afterEach(cleanup);
  test("Render without Crashing", () => {
    renderLogo();
  });
  test("Match snapshot logo component", () => {
    const { asFragment } = renderLogo();
    expect(asFragment()).toMatchSnapshot();
  });

  test("Display Logo", async () => {
    renderLogo();
    expect(screen.getByTitle(LOGO)).toBeInTheDocument();
  });
  //Doubt
  test("click on logo icon", async () => {
    // global.window = { location: { pathname: "/test/sample" } };
    renderLogo();
    expect(screen.getByTitle(LOGO)).toBeTruthy();
    fireEvent.click(screen.getByTitle(LOGO));
    expect(screen.getByTitle(LOGO)).toHaveBeenCalledTimes(1);
    // renderLogo();
    // const Click = screen.getByTitle(LOGO);
    // fireEvent(
    //   Click,
    //   new MouseEvent("click", {
    //     bubbles: true,
    //     cancelable: true,
    //   })
    // );
    // expect(Click).toHaveBeenCalledTimes(0);
  });
});
