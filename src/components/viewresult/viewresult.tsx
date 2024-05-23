import { Tabs, Button } from "antd";
import React from "react";
import _get from "lodash/get";
import { Image } from "antd";

import lockRedIcon from "../../assets/lockRed.svg";

import lockGreenIcon from "../../assets/lockGreen.svg";

import crossIcon from "../../assets/newclose-icon@2x.svg";

import checkMark from "../../assets/check-icon@2x.svg";

import style from "../viewresult/viewresult.module.scss";

import messages from "../../constants/messages";

const { TabPane } = Tabs;

const {
  CODING: {
    NO_TEST_FOUND,
    RUN_ALL_TEST_CASES,
    DESCRIPTION,
    DESCRIPTIONS,
    INPUT,
    OUTPUT,
    EXECUTION_LOGS,
    EXPECTED_OUTPUT,
    CPU,
    MEMORY,
    ANNOTATION,
    EVAL_TIME,
  },
} = messages;

const Viewresult = (data: any) => {
  let customData = data?.customAsyncData?.[0] || null;

  let { currentQuestion } = data;

  let sample_cases: any = currentQuestion?.sample_testcases?.length > 0;

  // console.log(data, "ssssssssssssssssssssssssssss");

  let custom_selected = data?.selectedType;
  const runDetails = _get(
    data,
    "run_details.getCodeEvaluatedData[0].testcases",
    null
  );

  let allTestCases: any;

  if (runDetails) {
    allTestCases = Object.values(runDetails);
  }

  const runAllTestCases = () => {
    data.handleRunAllTestCases();
    // console.log("run all test cases");
  };

  const RunCustomOutput = (val: any) => {
    return (
      <>
        <div className={style.testResultContainer}>
          <div className={style.runTestBtn}>
            {sample_cases && custom_selected ? (
              <Button onClick={runAllTestCases}>{RUN_ALL_TEST_CASES}</Button>
            ) : null}
          </div>
          <div className={style.decriptionContainer}>
            {/* <p>{annotation}</p> */}
            <p className={style.label}>{DESCRIPTION}</p>
            <div className={style.descBox}>
              <div
                className={
                  customData?.status === "AC/OK"
                    ? style.descriptionText
                    : style.descriptionTextError
                }
              >
                {/* <p>Execution SuccessFully</p> */}
                <p>{customData?.description}</p>
              </div>
              <div className={style.time}>
                <div>
                  <p className={style.timing}>{customData?.running_time}</p>
                  <p>{EVAL_TIME}</p>
                </div>
                <div>
                  <p className={style.timing}>{customData?.cputime}</p>
                  <p>{CPU}</p>
                </div>
                <div>
                  <p className={style.timing}>{customData?.memory_usage}</p>
                  <p>{MEMORY}</p>
                </div>
              </div>
            </div>
          </div>

          {/* {customData?.log.length > 1 ? (
            <div className={style.inputContainer}>
              <p className={style.label}>Input(SDIN)</p>
              <div className={style.inputBox}>
                <p className={style.textContent}>Text Here</p>
                <div className={style.b}></div>
              </div>
            </div>
          ) : null} */}

          <div className={style.logContainer}>
            <p className={style.label}>{EXECUTION_LOGS}</p>
            <div className={style.logBox}>
              <p className={style.textContent}>{customData?.output}</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  const TestCases = (val: any) => {
    let {
      annotation,
      description,
      cputime,
      output,
      input,
      status,
      memory_usage,
      running_time,
      expected_output,
    } = val?.data;
    // console.log(val.data, "test cases empty  ");
    return (
      <div className={style.testResultContainer}>
        {annotation ? (
          <div className={style.casesContainer}>
            <p className={style.label}>{ANNOTATION}</p>
            <div className={style.descBdox}>
              <div
                className={
                  status === "AC/OK"
                    ? style.descriptionText
                    : style.descriptionTextError
                }
              >
                {annotation ? (
                  <>
                    <p>{annotation}</p>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        <div className={style.casesContainer}>
          <p className={style.label}>{DESCRIPTIONS}</p>
          <div className={style.descBox}>
            <div
              className={
                status === "AC/OK"
                  ? style.descriptionText
                  : style.descriptionTextError
              }
            >
              <p>{description}</p>
            </div>
            <div className={style.time}>
              <div>
                <p>{running_time}</p>
                <p>{EVAL_TIME}</p>
              </div>
              <div>
                <p>{cputime}</p>
                <p>{CPU}</p>
              </div>
              <div>
                <p>{memory_usage}</p>
                <p>{MEMORY}</p>
              </div>
            </div>
          </div>
        </div>

        {input ? (
          <div className={style.inputContainer}>
            <p className={style.label}>{INPUT}</p>
            <p className={style.logBox}>{input}</p>
          </div>
        ) : null}

        {output ? (
          <div className={style.inputContainer}>
            <p className={style.label}>{OUTPUT}</p>
            <p className={style.logBox}>{output}</p>
          </div>
        ) : null}

        {expected_output ? (
          <div className={style.logContainer}>
            <p className={style.label}>{EXPECTED_OUTPUT}</p>
            <p className={style.logBox}>{expected_output} </p>
          </div>
        ) : null}
      </div>
    );
  };

  let activeKey = "0";

  return (
    <>
      {custom_selected ? (
        <RunCustomOutput />
      ) : (
        <>
          {runDetails !== null ? (
            <div>
              <div className={style.verticalTabs}>
                {/* <div>No Test Cases found</div> */}
                <Tabs tabPosition={"left"} defaultActiveKey={activeKey}>
                  {allTestCases?.map((val: any, index: any) => (
                    <TabPane
                      key={index}
                      className="verticalTabs"
                      tab={
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",

                            color: val.status === "AC/OK" ? "green" : "red",
                          }}
                        >
                          <p
                            style={{
                              maxWidth: "99px",
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                            }}
                          >
                            {val?.name}
                          </p>
                          <div className={style.tabIcons}>
                            <Image
                              data-testid="imagediv"
                              src={
                                val.status === "AC/OK" ? checkMark : crossIcon
                              }
                              alt={"alt"}
                              preview={false}
                            />

                            <Image
                              data-testid="imagediv"
                              src={
                                val.status === "AC/OK"
                                  ? lockGreenIcon
                                  : lockRedIcon
                              }
                              alt={"alt"}
                              preview={false}
                            />
                          </div>
                        </div>
                      }
                    >
                      <TestCases data={val} />
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            </div>
          ) : (
            <p className={style.noTestcases}> {NO_TEST_FOUND}</p>
          )}
        </>
      )}
    </>
  );
};

export default Viewresult;
