import { useState } from "react";
import messages from "./messages";

import useFetch from "./../data/dataBar-async";

import { getDuration, getTimeDiff, stringFiller } from "../data/utils";
import ProgressBarWrapper from "./../components/dataBar/progressBarWrapper/progressBarWrapper";
import { getProblemSelector } from "../selectors/problemSelector";
import { useSelector } from "react-redux";

const {
  FEEDBACK: { SUBMIT_LABEL },
  CANCEL,
  SUBMIT_MOVE_NEXT,
  SUBMIT_END,
  ARE_YOU_SURE,
  REPORT_LABLE,
  PROCEED_TO_NEXT,
  MODAL_CONTENT,
  TYPE_OUTLINE,
  TYPE_FILLED,
  AUTO_NEXT_MODAL,
  PROCEED_TO_FEEDBACK,
  GOING_GREAT,
} = messages;

const GetString = (timeLeft: any, str: string) => {
  const problems = useSelector(getProblemSelector);
  let total: number = 0,
    completed: number = 0;

  if (problems?.length >= 0) {
    problems &&
      problems.forEach((sec: any) => {
        sec.problems.forEach((singleObj: any) => {
          total++;
          if (singleObj.solution !== null) {
            completed++;
          }
        });
      });
  }

  return stringFiller(str, {
    ...timeLeft,
    total: total,
    completed: completed,
  });
};

const GetNextString = (timeLeft: any, str: string) => {
  const problems = useSelector(getProblemSelector);
  let SectionTotal: number = 0,
    sectionCompleted: number = 0;

  if (problems.length >= 0) {
    let current =
      problems &&
      problems?.find((val: any) => {
        return val.status === "CTK";
      });
    current &&
      current?.problems.map((val: any) => {
        if (val.solution !== null) {
          sectionCompleted++;
        }
      });
    SectionTotal = current && current.problems.length;
  }
  // console.log({
  //   ...timeLeft,
  //   total: SectionTotal,
  //   completed: sectionCompleted,
  // });

  return (
    stringFiller(str, {
      ...timeLeft,
      total: SectionTotal,
      completed: sectionCompleted,
    }) || []
  );
};

export const getSubmitConformationModal = ({
  onOk,
  onCancel,
  timeLeft,
  contentType,
  text,
}: any) => {
  return {
    title: ARE_YOU_SURE,
    onOk: onOk,
    onCancel: onCancel,
    text: contentType ? GetString(timeLeft, MODAL_CONTENT) : text,
    buttons: contentType
      ? [
          {
            type: TYPE_OUTLINE,
            display: CANCEL,
            onClick: onCancel,
          },
          {
            type: TYPE_FILLED,
            display: SUBMIT_END,
            onClick: onOk,
          },
        ]
      : null,
  };
};

export const getSubmitNextConformationModal = ({
  onOk,
  onCancel,
  timeLeft,
  contentType,
  text,
}: any) => {
  return {
    title: ARE_YOU_SURE,
    onOk: onOk,
    onCancel: onCancel,
    text: contentType ? GetNextString(timeLeft, MODAL_CONTENT) : text,
    buttons: contentType
      ? [
          {
            type: TYPE_OUTLINE,
            display: CANCEL,
            onClick: onCancel,
          },
          {
            type: TYPE_FILLED,
            display: SUBMIT_MOVE_NEXT,
            onClick: onOk,
          },
        ]
      : null,
  };
};
export const autoRedirectModalToNext = ({
  onOk,
  onCancel,
  timeLeft,
  contentType,
  text,
}: any) => {
  return {
    title: "",
    onOk: onOk,
    onCancel: onCancel,
    text: contentType ? text : GetString(timeLeft, AUTO_NEXT_MODAL),
    buttons: contentType
      ? [
          {
            type: TYPE_FILLED,
            display: PROCEED_TO_FEEDBACK,
            onClick: onOk,
          },
        ]
      : null,
  };
};
export const autoRedirectToSection = ({
  onOk,
  onCancel,
  timeLeft,
  contentType,
  text,
}: any) => {
  return {
    title: "",
    onOk: onOk,
    onCancel: onCancel,
    text: text,
    buttons: contentType
      ? [
          {
            type: TYPE_FILLED,
            display: "Submit and move to next section",
            onClick: onOk,
          },
        ]
      : null,
  };
};
