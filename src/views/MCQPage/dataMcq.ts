import exclamationCircle from "../../assets/exclamation_circle.svg";
import clearSvg from "../../assets/clear.svg";
import listIcon from "../../assets/list_item.svg";

export const dataMcqFun = ({ onOk, onCancel, disabled }: any) => {
  console.log(onOk, "onok");
  return {
    typeOfQuestions: "MCQ",
    Icon: listIcon,
    // title: "Answer",
    // text: "Please choose correct answer.",
    buttons: [
      {
        type: "rectFilled",
        display: "REPORT AN ISSUE",
        onClick: onOk,
        disabled: !true,
        beforeIcon: exclamationCircle,
      },
      {
        type: "rectOutline",
        display: "CLEAR",
        disabled: disabled,
        onClick: onCancel,
        beforeIcon: clearSvg,
      },
    ],
  };
};

export const FooterButtons = ({ onClick, disabled, onSubmit }: any) => {
  return [
    // {
    //   type: "rectFilled",
    //   display: "Save",
    //   onClick: onClick,
    //   disabled: disabled,
    // },
    {
      type: "rectFilled",
      display: "Submit",
      onClick: onSubmit,
      disabled: disabled,
    },
  ];
};
