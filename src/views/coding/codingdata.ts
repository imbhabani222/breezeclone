import exclamationCircle from "../../assets/exclamation_circle.svg";
import clearSvg from "../../assets/clear.svg";
import listIcon from "../../assets/list_item.svg";

export const dataSubjective = ({ onOk, onCancel, disabled }: any) => {
  return {
    // typeOfQuestions: "Subjective",
    // Icon: listIcon,
    text: "Please type your answer.",
    className: "AnswerSection",
    buttons: [
      {
        type: "rectFilled",
        display: "REPORT AN ISSUE",
        onClick: onOk,
        disabled: !true,
        beforeIcon: exclamationCircle,
      },
      // {
      //   type: "rectOutline",
      //   display: "CLEAR",
      //   disabled: disabled,
      //   onClick: onCancel,
      //   beforeIcon: clearSvg,
      // },
    ],
  };
};
