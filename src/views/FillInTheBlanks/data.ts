import exclamationCircle from "../../assets/exclamation_circle.svg";
import clearSvg from "../../assets/clear.svg";
import listIcon from "../../assets/list_item.svg";
export const dataFillInBlanksFun = ({ onOk, onCancel, disabled }: any) => {
  return {
    typeOfQuestions: "Fill In the Blanks",
    Icon: listIcon,
    // title: "Answer",
    //text: "Please type your answer.",
    buttons: [
      {
        type: "rectFilled",
        display: "REPORT AN ISSUE",
        onClick: onOk,
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
export const FooterButtons = ({
  onClick,
  disabledsave,
  disabledsubmit,
  onSubmit,
}: any) => {
  return [
    {
      type: "rectFilled",
      display: "Save",
      onClick: onClick,
      disabled: disabledsave,
    },
    {
      type: "rectFilled",
      display: "Submit",
      onClick: onSubmit,
      disabled: disabledsubmit,
    },
  ];
};
export const dataVideoTest = ({ onOk, onCancel, disabled }: any) => {
  return {
    typeOfQuestions: "Record Video",
    hideIcon: true,
    // title: "Answer",
    buttons: [
      {
        type: "rectFilled",
        display: "REPORT AN ISSUE",
        onClick: onOk,
        beforeIcon: exclamationCircle,
      },
    ],
  };
};
