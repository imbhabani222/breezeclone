import React, { useEffect, useState, useCallback } from "react";
import { Steps, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import clsx from "clsx";
import Icon from "@ant-design/icons";
import rightArrow from "../../../assets/right-arrow.svg";
import leftArrow from "../../../assets/left-arrow.svg";
import rightArrowDisabled from "../../../assets/arrow-disabled.svg";
import { ReactComponent as stepsrightArrow } from "../../../assets/right-icon.svg";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import styles from "../landingAndAssessment/instructionPageStyle.module.scss";

import instructionDetails from "../../../constants/instructionConstant";
import constants from "../../../constants/constants";
import useStepConfig from "./stepConfigAsync";
import { checkAction } from "../../../actions/actions";
import {
  getTest,
  getassessment,
  getIdentity,
  getcheckAction,
  getRecruiter,
  getsolutionSet,
  getindentityImg,
} from "../../../selectors/selectors";
import { fetchStartTestActions } from "../../../actions/initTestActions";
import BreezeModal from "../../../components/modal/modal";
import { getSubmitConformationModal } from "../../../constants/modals";
import { finishTestRequest } from "../../../actions/problemActions";
import { getSolutionSetSelector } from "../../../selectors/problemSelector";
import { createProctorAction } from "../../../actions/createProctorActions";
import { fetchTestSolActions } from "../../../actions/testSolActions";
import { fetchIdentityImgAction } from "../../../actions/fetchIdentityImgActions";
import { getDurationLeft, stringFiller } from "../../../data/utils";
import { proctor, proctorWithImage } from "../../../data/proctorInstructions";
import purifyInnerHtml from "../../../utils/innerHTML";
import _ from "lodash";

const {
  ROUTE: { TEST_SECTION_SUBMIT, INSTRUCTION_PAGE, FEEDBACK },
} = constants;

const {
  CONTINUE,
  INSTRUCTION_DOSELECT,
  INSTRUCTION,
  STEPS_TITLE_1,
  STEPS_TITLE_2,
  STEPS_TITLE_3,
  BACK,
  AGREE_AND_CONT,
  ALT_IMG,
  VIEW_PROBLEMS,
  FINISH_AND_SUBMIT,
  PROCTOR_MODE,
  PROCTOR_MODE_SWITCH,
} = instructionDetails;

const InstructionFromDoSelect = () => {
  const { Step } = Steps;
  const identityData: any = useSelector(getIdentity);
  const checkActionData: any = useSelector(getcheckAction);
  const [visible, setVisible] = useState(false);
  const solSet = useSelector(getSolutionSetSelector);
  const testDetails = useSelector(getTest);
  const assessmentData = useSelector(getassessment);
  const identityImageData = useSelector(getindentityImg);
  const solutionSetData = useSelector(getsolutionSet);
  const testStatus = checkActionData?.data?.startTimer;
  const videoStatus = checkActionData?.data?.videoStatus;
  const systemCheckStatus = checkActionData?.data?.systemCheckStatus;
  const data = {
    proctor: testDetails?.settings?.proctor.enabled,
    videoProctor: testDetails?.settings?.proctor?.video.enabled,
    imageProctor: testDetails?.settings?.proctor.snapshot,
  };

  let steps = useStepConfig();
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const navigateToFeedBack = useCallback(() => {
    localStorage.setItem("BrowserTcount", "0");
    dispatch(checkAction({ startTimer: false, duration: 0 }));
    dispatch(finishTestRequest(solSet.id, identityData.username));
    navigate(FEEDBACK.replace(":slug", slug));
  }, [dispatch, solSet.id]);
  const systemActionReducer = useSelector(
    (state: any) => state.assessmentPage && state.assessmentPage,
    shallowEqual
  );
  const onCancel = useCallback(() => {
    setVisible(false);
  }, []);

  const endAssessmentData = getSubmitConformationModal({
    onOk: navigateToFeedBack,
    onCancel,
    timeLeft: getDurationLeft(
      checkActionData?.data?.start_time || new Date(),
      checkActionData?.data?.duration || 0
    ),
    contentType: true,
  });
  const next = useCallback(() => {
    if (current === 0) {
      dispatch(createProctorAction("test", solutionSetData?.data?.id));
      dispatch(fetchIdentityImgAction("test", solutionSetData?.data?.id));
    }
    if (current === 0) {
      dispatch(checkAction({ systemCheckStatus: false }));
    }
    setCurrent(current + 1);
  }, [current, dispatch, solutionSetData?.data?.id]);
  let location = useLocation();
  const slug = location.pathname.split("/")[2];
  const prev = useCallback(() => {
    if (current === 2) {
      dispatch(checkAction({ systemCheckStatus: false }));
    }
    dispatch(checkAction({ checkStatus: false }));
    setCurrent(current - 1);
  }, [current, dispatch]);
  const goToQuestionPage = useCallback(() => {
    navigate(TEST_SECTION_SUBMIT.replace(":slug", slug));
  }, [navigate]);
  const backToAssessmentInstruction = useCallback(() => {
    navigate(INSTRUCTION_PAGE.replace(":slug", slug));
  }, [navigate, slug]);
  const goToQuestionsPage = useCallback(() => {
    dispatch(fetchStartTestActions(testDetails.id, identityData.username));
    navigate(TEST_SECTION_SUBMIT.replace(":slug", slug));
  }, [slug, navigate, dispatch, testDetails.id, identityData.username]);
  const onSubmit = useCallback(() => {
    setVisible(true);
  }, []);

  const getStepSubHeaderText = useCallback(() => {
    return (
      <div className={styles.instruction_header}>{steps[current].subTitle}</div>
    );
  }, [current]);

  useEffect(() => {
    if (!_.isEmpty(identityImageData))
      dispatch(fetchIdentityImgAction("test", solutionSetData?.data?.id));
  }, [dispatch, identityImageData, solutionSetData?.data?.id]);
  useEffect(() => {
    if (data.videoProctor || data.imageProctor) {
      let navigator: any;
      navigator = window.navigator;
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;
      navigator.mediaDevices.getUserMedia({ video: true });
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      fetchTestSolActions(
        identityData.usertype,
        identityData.user_id,
        testDetails.slug,
        "PLT",
        identityData.username
      )
    );
  }, []);
  const toggleProctorInstructions = () => {
    if (data.proctor && !data.videoProctor && !data.imageProctor) {
      return (
        <div className={styles.proctor_instruction}>
          {purifyInnerHtml(stringFiller(proctor, { type }))}
          {/* <div className={styles.proctormode}>{PROCTOR_MODE}</div> */}
        </div>
      );
    }
    if (data.videoProctor || data.imageProctor) {
      return (
        <div className={styles.proctor_instruction}>
          {purifyInnerHtml(stringFiller(proctorWithImage, { type }))}
          {/* <div className={styles.proctormode}>{PROCTOR_MODE}</div> */}
        </div>
      );
    }
    return;
  };
  const type = testDetails?.test_type_verbose;

  console.log(systemCheckStatus);
  return (
    <>
      <div className={styles.parent_div}>
        <BreezeModal
          contentType={true}
          modalHead={true}
          width={720}
          modalData={endAssessmentData}
          visible={visible}
        />
        <div className={styles.form_doselect_wrapper}>
          <div className={styles.common_div}>
            <div className={styles.instruction_doselect_maindiv}>
              <div className={styles.instruction_header_container}>
                {getStepSubHeaderText()}
                {steps[current].subTitle === INSTRUCTION ? (
                  <div className={styles.instruction_proctor}>
                    {PROCTOR_MODE_SWITCH}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className={styles.steps_div}>
                <div className={styles.responsive_steps}>
                  {testStatus === undefined ? (
                    <Steps responsive={false} current={current}>
                      {steps.map((item) => (
                        <Step
                          // icon={
                          //   current ==1 ?  <RightOutlined />:(current >=2 ?  <RightOutlined />)
                          //   current >= 3 ? (
                          //     <RightOutlined />
                          //   ) : (
                          //     <Icon component={stepsrightArrow} />
                          //   )
                          //   )
                          // }
                          // icon={
                          //   current == 0 ? (
                          //     <Icon component={stepsrightArrow} />
                          //   ) : null
                          // }
                          // icon={<RightOutlined />}
                          // icon={<Icon component={stepsrightArrow} />}
                          key={item.title}
                          title={item.title}
                        />
                      ))}
                    </Steps>
                  ) : null}
                </div>
              </div>
              {/* <div className={styles.steps_sub_heaader_div}>
                {getStepSubHeaderText()}
                {data.videoProctor || data.imageProctor || data.proctor ? (
                  <span className={styles.proctormode}>{PROCTOR_MODE}</span>
                ) : null}
              </div> */}
              {current === 0 ? toggleProctorInstructions() : ""}
              <div className={styles.steps_content}>
                {steps[current].content}
              </div>
              <div className={styles.line}></div>
              <div className={styles.steps_btn_div}>
                {testStatus === true ? (
                  <div className={styles.testStart}>
                    <Button
                      onClick={goToQuestionPage}
                      className={styles.btn_normal}
                    >
                      {VIEW_PROBLEMS}
                    </Button>
                    <Button onClick={onSubmit} className={styles.btn_normal}>
                      {FINISH_AND_SUBMIT}
                    </Button>
                  </div>
                ) : (
                  <div>
                    {" "}
                    {current < 1 ? (
                      <Button
                        onClick={backToAssessmentInstruction}
                        className={styles.btn_normal}
                      >
                        <img alt={ALT_IMG} src={leftArrow} /> {BACK}
                      </Button>
                    ) : (
                      <Button
                        onClick={() => prev()}
                        className={styles.btn_normal}
                      >
                        <img alt={ALT_IMG} src={leftArrow} /> {BACK}
                      </Button>
                    )}
                    {current >= 2 ? (
                      <Button
                        onClick={goToQuestionsPage}
                        className={clsx({
                          [styles.disabled_btn]:
                            !checkActionData?.data?.checkStatus,
                          [styles.btn_gray]: true,
                        })}
                      >
                        {AGREE_AND_CONT}
                        <img
                          alt={ALT_IMG}
                          src={
                            checkActionData?.data?.checkStatus
                              ? rightArrow
                              : rightArrowDisabled
                          }
                        />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => next()}
                        className={clsx({
                          [styles.disabled_btn]:
                            (!systemCheckStatus ||
                              (data.videoProctor || data.imageProctor
                                ? videoStatus === undefined
                                : "")) &&
                            current === 1,
                          [styles.btn_gray]: true,
                        })}
                      >
                        {CONTINUE}
                        <img
                          alt={ALT_IMG}
                          src={
                            (!systemCheckStatus ||
                              (data.videoProctor || data.imageProctor
                                ? videoStatus === undefined
                                : "")) &&
                            current === 1
                              ? rightArrowDisabled
                              : rightArrow
                          }
                        />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(InstructionFromDoSelect);
