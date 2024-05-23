import React, { useState, useCallback, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Typography, Button } from "antd";
import clsx from "clsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import moment from "moment";
import _isEmpty from "lodash/isEmpty";
import Fingerprint2 from "fingerprintjs2";

import rightArrow from "../../../assets/right-arrow.svg";
import leftArrow from "../../../assets/left-arrow.svg";
import { Spin } from "antd";

import styles from "./testQuestions.module.scss";
import { Link } from "react-router-dom";

import instructionDetails from "../../../constants/instructionConstant";
import TableContainer from "../../../components/TableContainer/TableContainer";
import constants from "../../../constants/constants";
import { columnsData } from "./columnConfig";
import { checkAction, systemActions } from "../../../actions/actions";
import {
  getSubmitConformationModal,
  getSubmitNextConformationModal,
  autoRedirectModalToNext,
} from "../../../constants/modals";
import BreezeModal from "../../../components/modal/modal";
import timerData from "../../../data/counter.json";

import {
  fetchProblemRequest,
  fetchSolutionSetRequest,
  finishTestRequest,
  postSectionRequest,
} from "../../../actions/problemActions";

import {
  getProblemSelector,
  getSolutionSetSelector,
  getStatusCodeSolutionSetSelector,
} from "../../../selectors/problemSelector";

import {
  getcheckAction,
  getIdentity,
  getTest,
  getTestPending,
  getTestStartDetails,
  gettestStartError,
} from "../../../selectors/selectors";
import Loader from "../../../assets/loader.svg";

import sections from "../../../data/testSectionWise.json";
import MCQ from "../../MCQPage/MCQ";
import { getSectionPostDataSelector } from "../../../selectors/questionsSelector";
import { getDurationLeft } from "../../../data/utils";
import { createProctorAction } from "../../../actions/createProctorActions";

const {
  ROUTE: { DOSELECT_INSTRUCTION, FEEDBACK, SWITCH_PATH },
} = constants;
const { Text } = Typography;

const { ALT_IMG, BACK_TO_INSTR, FINISH_AND_SUBMIT, SUBMIT_AND_NEXT, ROW_KEY } =
  instructionDetails;

const TestQuestionsPage = () => {
  const loader = <img alt="Loading" className={styles.loader} src={Loader} />;
  const [loaded, setLoaded] = useState<Boolean>(false);

  const testStartDetails = useSelector(getTestStartDetails);
  const { timeLeft } = timerData;
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const getPostSectionStatus = useSelector(getSectionPostDataSelector);
  const getSystemAction: any = useSelector(getcheckAction);

  const [submitSection, setsubmitSection] = useState(false);

  const onSubmit = useCallback(() => {
    setVisible(true);
    setsubmitSection(false);
  }, [navigate]);

  const onCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const solSet = useSelector(getSolutionSetSelector);
  const getSolSetStatusCode = useSelector(getStatusCodeSolutionSetSelector);
  const testDetails = useSelector(getTest);

  useEffect(() => {
    if (testStartDetails.staus !== 404) {
      setLoaded(true);
      dispatch(fetchProblemRequest(testDetails?.id));
    }
  }, [dispatch, testDetails?.id, testStartDetails]);

  useEffect(() => {
    dispatch(fetchSolutionSetRequest(testDetails?.id));
    dispatch(createProctorAction("test", solSet.id));
  }, [dispatch, solSet.id, testDetails?.id, timeLeft]);

  const location = useLocation();
  const slug = location.pathname.split("/")[2];
  const identityData: any = useSelector(getIdentity);

  const gotoDoSelectInformation = useCallback(() => {
    navigate(DOSELECT_INSTRUCTION.replace(":slug", slug));
  }, [navigate, slug]);

  const navigateToFeedBack = useCallback(() => {
    localStorage.setItem("BrowserTcount", "0");
    dispatch(checkAction({ startTimer: false, duration: 0 }));
    dispatch(finishTestRequest(solSet.id, identityData.username));
    navigate(FEEDBACK.replace(":slug", slug));
  }, [dispatch, solSet.id]);

  let currentSection = solSet?.sections?.filter(
    (val: any, id: any) => val.status === "CTK"
  );

  let sectionSlug =
    currentSection && currentSection?.map((val: any) => val.slug);

  let nextSection =
    currentSection &&
    currentSection[0] &&
    currentSection[0].problems &&
    currentSection[0].problems[0];

  const onSubmitNext = () => {
    setVisible(true);
    setsubmitSection(true);
  };

  const dumyClick = () => {
    // navigate(SWITCH_PATH.replace(":slug", slug).replace(":id", nextSection));
  };

  const systemActionReducer = useSelector(
    (state: any) => state.assessmentPage && state.assessmentPage,
    shallowEqual
  );

  const checkActionSelector: any = useSelector(getcheckAction);

  const allProblems = useSelector(getProblemSelector);

  const testPending = useSelector(getTestPending);

  const postSection = useCallback(() => {
    if (submitSection) {
      let payload = {
        solutionset_id: solSet.id,
        section_slug: sectionSlug[0],
        force_submission: false,
      };
      dispatch(postSectionRequest("PLT", identityData.username, payload));
    }

    // if (submitSection) {
    //   navigate(SWITCH_PATH.replace(":slug", slug).replace(":id", nextSection));
    // }
    setVisible(false);
  }, [dispatch, identityData.username, sectionSlug, solSet.id, submitSection]);
  useEffect(() => {
    if (getPostSectionStatus?.status === "SUCCESS") {
      dispatch(fetchProblemRequest(testDetails?.id));
      dispatch(fetchSolutionSetRequest(testDetails?.id));
    }
  }, [dispatch, getPostSectionStatus, testDetails?.id]);
  // console.log(getPostSectionStatus);

  const data = getSubmitConformationModal({
    onOk: navigateToFeedBack,
    onCancel,
    timeLeft: getDurationLeft(
      checkActionSelector?.data?.start_time || new Date(),
      checkActionSelector?.data?.duration || 0
    ),
    contentType: true,
  });

  const NextData = getSubmitNextConformationModal({
    onOk: postSection,
    onCancel,
    timeLeft: getDurationLeft(
      checkActionSelector?.data?.section_start_time || new Date(),
      checkActionSelector?.data?.section_duration || 0
    ),
    contentType: true,
  });
  const autoRedirectVisible = autoRedirectModalToNext({
    onOk: postSection,
    onCancel,
    timeLeft: systemActionReducer.timeLeft,
    contentType: true,
  });
  const antIcon = <img alt="Loading" className={styles.loader} src={Loader} />;

  let withNoSections: Array<string> = [];
  allProblems &&
    allProblems?.map((data: any) => {
      return withNoSections.push(...data.problems);
    });

  let displaySectionNames = testDetails?.settings?.display?.section_names;

  let withNOTimedSections =
    allProblems &&
    allProblems?.map((data: any) => {
      return data.status === "";
    });

  return allProblems.length ? (
    <div className={styles.parent_div}>
      <div className={styles.test_questions_wrapper}>
        <BreezeModal
          contentType={true}
          modalHead={true}
          width={720}
          modalData={submitSection ? NextData : data}
          visible={visible}
        />
        {withNOTimedSections[0] && !displaySectionNames ? (
          <div className={styles.main_table_header}>
            <div>
              {/* <div className={clsx(styles.main_div_clipath)}>
                <div className={styles.triangle_div}></div>
                <Text className={styles.questions_desc}>{"dsdds"}</Text>
              </div> */}
              {/* <Spin spinning={testPending} indicator={antIcon}> */}
              <TableContainer
                classData={styles.table_style}
                bordered={false}
                rowKey={ROW_KEY}
                scroll={{ x: 700 }}
                data={withNoSections}
                columnsData={columnsData}
                pagination={false}
                onChange={null}
                rowSelection={null}
                rowClassName={null}
              />
              {/* </Spin> */}
              <div className={styles.questions_btn_div}>
                <div>
                  <Button
                    onClick={gotoDoSelectInformation}
                    className={styles.back_to_instr_btn}
                  >
                    <img alt={ALT_IMG} src={leftArrow} /> {BACK_TO_INSTR}
                  </Button>
                  <Button onClick={onSubmit} className={styles.finish_btn}>
                    {FINISH_AND_SUBMIT}
                    <img alt={ALT_IMG} src={rightArrow} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          allProblems &&
          allProblems?.map((data: any, index: number) => {
            return (
              <div key={`${index}q`} className={styles.main_table_header}>
                <div key={index}>
                  <div
                    className={clsx(
                      styles.main_div_clipath,
                      data.status !== "CTK" && data.status !== ""
                        ? styles.disable_test
                        : ""
                    )}
                  >
                    <div className={styles.triangle_div}></div>
                    {displaySectionNames ? (
                      <Text className={styles.questions_desc}>{data.name}</Text>
                    ) : (
                      <Text className={styles.questions_desc}>
                        Section {index + 1}
                      </Text>
                    )}
                  </div>
                  <div
                    className={
                      data.status !== "CTK" && data.status !== ""
                        ? styles.disable_test
                        : ""
                    }
                  >
                    <TableContainer
                      classData={styles.table_style}
                      bordered={false}
                      rowKey={data}
                      scroll={{ x: 700 }}
                      data={data.problems}
                      columnsData={columnsData}
                      pagination={false}
                      onChange={null}
                      rowSelection={null}
                      rowClassName={null}
                    />
                  </div>
                  <div
                    className={clsx(styles.questions_btn_div, styles.loop_btn)}
                  >
                    {index === allProblems.length - 1 ? (
                      <div className={styles.questions_btn_container}>
                        <Button
                          onClick={gotoDoSelectInformation}
                          className={styles.back_to_instr_btn}
                        >
                          <img alt={ALT_IMG} src={leftArrow} /> {BACK_TO_INSTR}
                        </Button>
                        <Button
                          onClick={onSubmit}
                          className={styles.finish_btn}
                        >
                          {FINISH_AND_SUBMIT}
                          <img alt={ALT_IMG} src={rightArrow} />
                        </Button>
                      </div>
                    ) : null}
                    {data.status === "CTK" &&
                    index !== allProblems.length - 1 ? (
                      <>
                        <Button
                          onClick={onSubmitNext}
                          className={styles.submit_next}
                        >
                          {SUBMIT_AND_NEXT}
                          <img alt={ALT_IMG} src={rightArrow} />
                        </Button>

                        {/* <Button
                          onClick={dumyClick}
                          className={styles.submit_next}
                        >
                          Dumy clickcc
                          <img alt={ALT_IMG} src={rightArrow} />
                        </Button> */}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <Spin
        tip={"Loading your Assessment"}
        spinning={true}
        indicator={loader}
      ></Spin>
    </div>
  );
};

export default React.memo(TestQuestionsPage);
