import React from "react";
import { Modal, Divider } from "antd";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import FormatText from "../../katexToHtml/formatText";
import Modals, { ModalProps } from "../modal";

describe("Modal Unit Testing", () => {
  const handleClose = jest.fn();
  const handleOpen = jest.fn();
  const defaultProps: ModalProps = {
    modalData: {
      onOk: handleOpen,
      onCancel: handleClose,
      buttons: undefined,
      text: "",
    },
    visible: true,
    Content: "data",
    showContent: true,
    contentType: true,
  };

  function renderModal(props: ModalProps) {
    console.log({ ...defaultProps, ...props });
    return render(<Modals {...defaultProps} />);
  }

  afterEach(cleanup);
  test("Render without Crashing", () => {
    renderModal(defaultProps);
  });
  test("Match snapshot modal component", () => {
    const { asFragment } = renderModal(defaultProps);
    expect(asFragment()).toMatchSnapshot();
  });
  test("modal shows the children", () => {
    renderModal(defaultProps);
    expect(screen.getByText("data")).toBeTruthy();
  });
  test("modal doesnot show content", () => {
    renderModal({ ...defaultProps, showContent: false });
    console.log("defaultProps");
    // expect(screen.getByText("data")).toBeNull;
    expect(screen.getByTestId("closeIcon")).toBeNull;
    // expect(screen.getByText("data")).toBeNull;
  });
  test("check click close button", () => {
    renderModal(defaultProps);
    fireEvent.click(screen.getByTestId("closeIcon"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("when ESC key is pressed", () => {
    var evt = new KeyboardEvent("keydown", { keyCode: 27 });
    document.dispatchEvent(evt);
    expect(handleClose).toHaveBeenCalledTimes(0);
  });
  it("closes modal if document is clicked", () => {
    const evt = new MouseEvent("click", { bubbles: true });
    document.dispatchEvent(evt);
    expect(handleClose).toHaveBeenCalledTimes(0);
  });
  // it('does not close if modal is clicked', () => {
  //     const evt = new MouseEvent('click', { bubbles: true });
  //     const modal = document.body.querySelector('.modal');
  //     modal.dispatchEvent(evt);
  //     expect(handleClose).toHaveBeenCalledTimes(0);
  // });
});
// expect(wrapper.find('ModalHeader')).toHaveLength(1);

//       expect(wrapper.find('ModalBody')).toHaveLength(1);
// test("should display a ModalHeader", async () => {
//   renderModal();
//   expect(screen.findByText("data")).toBeInTheDocument();
// });

// describe("Modal Unit Testing", () => {
//   const handleClose = jest.fn();
//   const handleOpen = jest.fn();
//   const defaultProps: ModalProps = {
//     modalData: {
//       onOk: handleOpen,
//       onCancel: handleClose,
//       buttons: undefined,
//       text: "",
//     },
//     visible: false,
//     Content: "data",
//     showContent: true,
//     contentType: true,
//   };

//   function renderModal(props: ModalProps) {
//     return render(<Modal {...defaultProps} />);
//   }

//   afterEach(cleanup);
//   test("Render without Crashing", () => {
//     renderModal(defaultProps);
//   });
//   test("Match snapshot modal component", () => {
//     const { asFragment } = renderModal(defaultProps);
//     expect(asFragment()).toMatchSnapshot();
//   });
//   test("modal shows the children", () => {
//     renderModal(defaultProps);
//     expect(screen.getByText("data")).toBeTruthy();
//   });
//   test("check click close button", () => {
//     renderModal(defaultProps);
//     fireEvent.click(screen.getByTestId("closeIcon"));
//     expect(handleClose).toHaveBeenCalledTimes(1);
//   });
//   it("opens modal when button is clicked", () => {
//     renderModal(defaultProps);
//     expect(screen.getByTestId("modal")).toHaveAttribute("visible", false);
//     // expect(handleOpen).toHaveBeenCalledWith(visible", "false");
//     fireEvent.click(screen.getByTestId("modal"));
//     expect(screen.getByTestId("modal")).toHaveAttribute("visible", true);
//   });

// it("when ESC key is pressed", () => {
//   var evt = new KeyboardEvent("keydown", { keyCode: 27 });
//   document.dispatchEvent(evt);
//   expect(handleClose).toHaveBeenCalledTimes(0);
// });
// it("closes modal if document is clicked", () => {
//   renderModal(defaultProps);
//   fireEvent.click(screen.getByTestId("closeIcon"));
//   expect(handleClose).toHaveBeenCalledTimes(1);

// });
// it("modal header check", async () => {
//   renderModal(defaultProps);
//   await expect(screen.queryByText("modal head")).toBeInTheDocument();
//   // const evt = new MouseEvent("click", { bubbles: true });
//   // document.dispatchEvent(evt);
//   // expect(handleClose).toHaveBeenCalledTimes(0);
// });

// it('does not close if modal is clicked', () => {
//     const evt = new MouseEvent('click', { bubbles: true });
//     const modal = document.body.querySelector('.modal');
//     modal.dispatchEvent(evt);
//     expect(handleClose).toHaveBeenCalledTimes(0);
// });
//});
// expect(wrapper.find('ModalHeader')).toHaveLength(1);

//       expect(wrapper.find('ModalBody')).toHaveLength(1);
// test("should display a ModalHeader", async () => {
//   renderModal();
//   expect(screen.findByText("data")).toBeInTheDocument();
// });
