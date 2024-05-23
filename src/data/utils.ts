import moment from "moment";
import map from "lodash/map";
import _filter from "lodash/filter";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const getDuration = (seconds: any, addZero?: any, callBack?: any) => {
  if (seconds < 0) return callBack ? callBack() : false;
  const duration = moment.duration(seconds, "milliseconds");
  if (addZero) {
    return {
      hours: ("0" + duration.hours()).substr(-2),
      minutes: ("0" + duration.minutes()).substr(-2),
      seconds: ("0" + duration.seconds()).substr(-2),
    };
  } else {
    return {
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  }
};

export const getTimeLeft = (
  timeDiff: number,
  _duration: number,
  callBack: any
) => {
  const duration = moment
    .duration(_duration, "minutes")
    .subtract(timeDiff, "seconds");
  if (duration.valueOf() <= 0) return callBack();
  return duration;
};

export const formatDateTime = (date: string | number) => {
  const _date = moment(date);
  return {
    date: _date.format("DD MMM YYYY"),
    time: _date.format("h:MM A"),
  };
};

export const getTimeDiff = (time: any) => {
  const currentTime = moment().valueOf();
  return (currentTime - time) / 1000;
};
export const stringFiller = (str: any, data: any) => {
  Object.keys(data).forEach(
    (key: any) =>
      (str = str.replaceAll(
        `%${key}%`,
        data[key]?.toString().length === 1 ? "0" + data[key] : data[key]
      ))
  );
  return str;
};

export const stringFillerInput = (str: any, data: any) => {
  console.log(str);
  Object.keys(data).forEach(
    (key: any) =>
      (str = str.replaceAll(
        `{${key}}`,
        data[key]?.toString().length === 1 ? "0" + data[key] : data[key]
      ))
  );
  return str;
};

export const checkSpace = (event: any) => {
  if (!/^\S+$/.test(event.key) && event.key !== "Backspace") {
    return true;
  }
};

export const getDurationLeft = (date: any, duration: number) => {
  const diff = getTimeDiff(date);
  const _duration = moment
    .duration(duration, "minutes")
    .subtract(diff, "seconds");
  // console.log({
  //   hours: _duration.hours(),
  //   minutes: _duration.minutes(),
  //   seconds: _duration.seconds(),
  // });

  if (duration.valueOf() <= 0) return { hours: 0, minutes: 0, seconds: 0 };
  return {
    hours: _duration.hours(),
    minutes: _duration.minutes(),
    seconds: _duration.seconds(),
  };
};

export const getAllProblemTypes = (data: any) => {
  const mapData = map(data, "problem_type");

  const names =
    mapData &&
    mapData?.filter(function (item: any, pos: any) {
      return mapData.indexOf(item) === pos;
    });

  if (names) {
    let types = names.toString().replaceAll(",", "+");
    let allTypes = types
      .replaceAll("SUB", "Subjective")
      .replaceAll("VID", "Video")
      .replaceAll("SCR", "Coding")
      .replaceAll("FIB", "Fill in the blanks");
    return allTypes;
  }
};

export const getAllSolvedIds = (data: any) => {
  let solMap = data && data?.solutions_map;
  const getKeys = Object.keys(solMap);
  return getKeys;
};

export const onSubmitFun = (
  allQuestions: any,
  mcqIndex: any,
  navi: any
  // cb: any
) => {
  let problemSlugParam = window.location.pathname.split("/")[4];
  let testSlug = window.location.pathname.split("/")[2];
  let totalProblems = allQuestions.length;

  let getIndex = allQuestions?.findIndex(
    (data: any) => data.slug === problemSlugParam
  );

  if (allQuestions.length === totalProblems) {
    navi("/test/:slug/problems".replace(":slug", testSlug));
  }

  if (
    (mcqIndex || getIndex) >= 0 &&
    (mcqIndex || getIndex) < allQuestions.length - 1
  ) {
    mcqIndex = getIndex + 1;
    navi(
      "/test/:slug/problems/:id"
        .replace(":slug", testSlug)
        .replace(":id", allQuestions[getIndex + 1].slug)
    );
  }
  //  cb();
};
