import React from "react";
import ReactDOM from "react-dom";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ButtonGrp, { ButtonProps, ButtonArrayProps } from "../buttonGrp";

describe("Button Group Testing", () => {
  const handleClick = jest.fn();
  const defaultProps: ButtonProps = {
    className: "Clear",
    display: "Clear",
    type: "submit",
    onClick: handleClick,
    beforeIcon: "beforeIcon",
    afterIcon: "afterIcon",
    disabled: true,
  };

  const ButtondataProps: ButtonArrayProps = {
    buttons: [defaultProps],
    className: "footer_btn_div",
  };
  function renderButton(props: ButtonArrayProps) {
    console.log({ ...ButtondataProps, ...props });
    return render(<ButtonGrp {...ButtondataProps} {...props} />);
  }

  afterEach(cleanup);

  test("Render without Crashing", () => {
    renderButton(ButtondataProps);
  });
  test("Match snapshot button component", () => {
    const { asFragment } = renderButton(ButtondataProps);
    expect(asFragment()).toMatchSnapshot();
  });
  test("Render button Correctly", async () => {
    renderButton(ButtondataProps);
    expect(screen.getByTestId("button-up-Clear")).toHaveTextContent("Clear");
  });
  test("check button having disable property", async () => {
    renderButton(ButtondataProps);
    expect(screen.getByText("Clear").closest("button")).toBeDisabled();
  });
  test("check button enable", async () => {
    renderButton({ buttons: [{ ...defaultProps, disabled: false }] });
    console.log("button");
    expect(screen.getByText("Clear").getAttribute("disabled")).toBe(null);
  });
  test("renders the  before icon alt Name", () => {
    renderButton(ButtondataProps);
    expect(screen.getByAltText("beforeIcon")).toBeInTheDocument();
    const image = screen.getByAltText("beforeIcon");
    expect(image).toHaveAttribute("src", "beforeIcon");
  });
  test("renders the after Icon alt Name", () => {
    renderButton(ButtondataProps);
    expect(screen.getByAltText("afterIcon")).toBeInTheDocument();
    const image = screen.getByAltText("afterIcon");
    expect(image).toHaveAttribute("src", "afterIcon");
  });
  test("click on button icon", async () => {
    renderButton(ButtondataProps);
    fireEvent.click(
      screen.getByTestId("button-up-Clear"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
  });
  test("will call onClick when enabled", async () => {
    renderButton({ buttons: [{ ...defaultProps, disabled: false }] });
    console.log("clicked");
    fireEvent.click(screen.getByTestId("button-up-Clear"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("will not call onClick when disabled", async () => {
    renderButton(ButtondataProps);
    fireEvent.click(screen.getByTestId("button-up-Clear"));
    expect(handleClick).toHaveBeenCalledTimes(0);
    // expect(handleClick).not.toHaveBeenCalled();
  });
  // test("Class Name should be present", () => {
  //   renderButton(ButtondataProps);
  //   console.log(defaultProps);
  //   expect(screen.getByText(defaultProps.className)).not.toBeNull();
  // });
});

// test("Class Name should be present", () => {
//   renderButton(ButtondataProps);
// expect(screen.getByText(ButtondataProps.className)).not.toBeNull();
// expect(screen.getByText("HELLO")).toBeTruthy();
// expect(screen.getAllByText(defaultProps.className)).toBeInTheDocument();
// });

// test("Button Class Name should be present", () => {
//   renderButton(ButtondataProps);
//   console.log(ButtondataProps);
//   expect(screen.getByRole("button")).toHaveClass("footer_btn_div");
//   expect(screen.queryByText(ButtondataProps.className)).toBeNull();
//   expect(screen.getByText("HELLO")).toBeTruthy();
//   expect(screen.getAllByText(defaultProps.className)).toBeInTheDocument();
// });

// test("Class Name should be present", () => {
//   renderButton(defaultProps);
//   expect(screen.getAllByText(defaultProps.className)).not.toBeNull();
//   expect(screen.getByText("HELLO")).toBeTruthy();
//   expect(screen.getAllByText(defaultProps.className)).toBeInTheDocument();
// });

// test("calls onClick prop when clicked", () => {
//   const handleClick = jest.fn();
//   renderButton(defaultProps);
//   fireEvent.click(screen.getByRole("button", { name: defaultProps.className }));
//   expect(handleClick).toHaveBeenCalledTimes(1);
// });
// });
