import React from "react";

import constants from "../../constants/constants";
import messages from "../../constants/messages";

import TestStatus from "./TestStatus";

const { STATUS_KEY, DESCRIPTION_KEY } = constants;
const {
  DESCRIPTION_LABEL,
  STATUS_CODE_LABEL,
  LIBRARIES_AVAILABLE_LABEL,
  TIME_LIMIT_LABEL,
  MEMORY_UNIT_LABEL,
  VERSION_LABEL,
  LIBRARIES_AVAILABLE_KEY,
  MEMORY_UNIT_KEY,
  TIME_LIMIT_KEY,
  LANGUAGE_LABEL,
} = messages;

export const columnsCED = [
  {
    title: LANGUAGE_LABEL,
    dataIndex: LANGUAGE_LABEL,
    width: 250,
  },
  {
    title: VERSION_LABEL,
    dataIndex: VERSION_LABEL,
    width: 310,
  },
  {
    title: MEMORY_UNIT_LABEL,
    dataIndex: MEMORY_UNIT_KEY,
    width: 155,
  },
  {
    title: TIME_LIMIT_LABEL,
    dataIndex: TIME_LIMIT_KEY,
    width: 160,
  },
  {
    title: LIBRARIES_AVAILABLE_LABEL,
    dataIndex: LIBRARIES_AVAILABLE_KEY,
    width: 250,
  },
];

export const columnsSER = [
  {
    title: STATUS_CODE_LABEL,
    dataIndex: STATUS_KEY,
    width: 200,
    render: (record: any) => (
      <TestStatus
        status={record === "AC/OK" || record === "AC"}
        id={record}
        name={record}
      />
    ),
  },
  {
    title: DESCRIPTION_LABEL,
    dataIndex: DESCRIPTION_KEY,
    width: 650,
  },
];
