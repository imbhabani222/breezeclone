import React, {
  useEffect,
  useCallback,
  useState,
  useContext,
  // , useContext
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import clsx from "clsx";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import User from "../../../assets/lady-img.svg";
import Bestwishes from "../../../assets/bestwishes.svg";
import BestwishesMobile from "../../../assets/best_wishes_mobile.svg";
import WishesImage from "../../../assets/wishes-image.png";
import RightArrow from "../../../assets/right-arrow.svg";
import Loader from "../../../assets/loader.svg";
import infoIcon from "../../../assets/Images/infoIcon.svg";

import styles from "./instructionPageStyle.module.scss";

import {
  getTest,
  getIdentity,
  getsolutionSetError,
  getsolutionSet,
  getinItSet,
  getcheckAction,
} from "../../../selectors/selectors";
import { getSubmitConformationModal } from "../../../constants/modals";
import BreezeModal from "../../../components/modal/modal";
import instructionDetails from "../../../constants/instructionConstant";
import constants from "../../../constants/constants";
import { fetchTestSolActions } from "../../../actions/testSolActions";
import { fetchInitTestActions } from "../../../actions/initTestActions";
import { assessmentInstructionTitleArray } from "../../../data/instructionData";
import { finishTestRequest } from "../../../actions/problemActions";
import { getSolutionSetSelector } from "../../../selectors/problemSelector";
import { getDurationLeft } from "../../../data/utils";
import { checkAction } from "../../../actions/actions";
import { WebSocketContext } from "../../../utils/socket";

const { Text } = Typography;
const {
  CONTINUE,
  ASSESSMENT_INSTRUCTION,
  ALT_IMG,
  CURRENTLY_TAKING,
  ALL_PROBLEMS,
  DOSELECT_INSTR,
  END_ASSESSMENT,
} = instructionDetails;
const {
  ROUTE: { DOSELECT_INSTRUCTION, TEST_SECTION_SUBMIT, FEEDBACK },
} = constants;

const AssessmentInstruction = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const identityData: any = useSelector(getIdentity);
  const testDetails = useSelector(getTest);
  const solsetError = useSelector(getsolutionSetError);
  const getsolutionSetData = useSelector(getsolutionSet);
  const getinItData = useSelector(getinItSet);
  const checkActionData: any = useSelector(getcheckAction);
  const location = useLocation();
  const slug = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const testStatus = checkActionData?.data?.startTimer;
  const ws: any = useContext(WebSocketContext);
  // console.log(testStatus);
  const solSet = useSelector(getSolutionSetSelector);
  const gotoDoSelectInformation = useCallback(() => {
    setVisible(true);
    dispatch(
      fetchTestSolActions(
        identityData.usertype,
        identityData.user_id,
        testDetails.slug,
        "PLT",
        identityData.username
      )
    );
    ws?.fetchSettings();
  }, [
    dispatch,
    identityData.usertype,
    identityData.user_id,
    identityData.username,
    testDetails.slug,
    ws,
  ]);
  // const ws: any = useContext(WebSocketContext);
  const onCancel = useCallback(() => {
    setVisible(false);
  }, []);

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
  const onSubmit = useCallback(() => {
    setVisible(true);
  }, []);
  const data = getSubmitConformationModal({
    contentType: false,
    text: `<div><span>Please wait, preparing your ${testDetails.test_type_verbose}<span></div><img alt="loading.." src=${Loader}/>`,
  });

  const endAssessmentData = getSubmitConformationModal({
    onOk: navigateToFeedBack,
    onCancel,
    timeLeft: getDurationLeft(
      checkActionData?.data?.start_time || new Date(),
      checkActionData?.data?.duration || 0
    ),
    contentType: true,
  });
  const navigatePages = useCallback((pageName) => {
    switch (pageName) {
      case "problems page":
        navigate(TEST_SECTION_SUBMIT.replace(":slug", slug));
        break;
      case "doselect instructions":
        navigate(DOSELECT_INSTRUCTION.replace(":slug", slug));
        break;
    }
  }, []);
  useEffect(() => {
    if (ws) {
      ws?.registerEvent((data: any) => {
        //  console.log(data, "HERE");
      });
      ws?.fetchSettings((data: any) => {
        //  console.log(data, "HERE");
      });
    }
  }, [ws]);
  useEffect(() => {
    let payload = { id: testDetails.id };
    if (solsetError === 404 && getinItData?.statusCode !== 201) {
      dispatch(
        fetchInitTestActions(testDetails.id, identityData.username, payload)
      );
    }
  }, [
    slug,
    navigate,
    dispatch,
    getsolutionSetData?.statusCode,
    solsetError,
    getinItData?.statusCode,
    testDetails.id,
    identityData.username,
  ]);
  if (
    (getsolutionSetData?.statusCode === 200 ||
      getinItData?.statusCode === 201) &&
    testStatus === undefined
  ) {
    navigate(DOSELECT_INSTRUCTION.replace(":slug", slug));
  }
  // console.log(testStatus);
  return (
    <div className={styles.parent_div}>
      <BreezeModal
        contentType={testStatus !== undefined}
        modalHead={true}
        width={720}
        modalData={testStatus !== undefined ? endAssessmentData : data}
        visible={visible}
      />
      <div className={styles.instruction_main_div_wrapper}>
        <div className={styles.assessment_body}>
          <div className={styles.assessment_div}>
            <div className={styles.assessment_contents_image_mobile}>
              <img alt={ALT_IMG} className={styles.img_fluid} src={User} />
            </div>
            <Text className={styles.main_header_style}>
              {ASSESSMENT_INSTRUCTION}
            </Text>
          </div>
          <div className={styles.assessment_contents}>
            <div className={styles.assessment_contents_text}>
              {assessmentInstructionTitleArray.map((data, index) => (
                <div key={index} className={styles.list_div}>
                  <div className={styles.ellipse}></div>
                  <div className={styles.ellipse_text}>{data.title}</div>
                </div>
              ))}
            </div>
            <div className={styles.assessment_contents_image}>
              <img alt={ALT_IMG} className={styles.img_lady} src={User} />
            </div>
          </div>
        </div>
        <div className={styles.best_wishes_wrapper}>
          <div className={styles.best_wishes_png}>
            <span>Best wishes from {testDetails?.company?.name}</span>
            <img
              alt={ALT_IMG}
              className={clsx(styles.best_wishes, styles.img_fluid)}
              src={WishesImage}
            />
          </div>

          {testStatus !== undefined ? (
            <div className={styles.testStatus}>
              <img alt={ALT_IMG} src={infoIcon} />
              {CURRENTLY_TAKING}
              <span onClick={() => navigatePages("problems page")}>
                {ALL_PROBLEMS}
              </span>
              <span onClick={() => navigatePages("doselect instructions")}>
                {DOSELECT_INSTR}
              </span>
              <span onClick={onSubmit}>{END_ASSESSMENT}</span>
            </div>
          ) : (
            <div className={styles.assessment_btn}>
              <Button
                onClick={gotoDoSelectInformation}
                className={styles.btn_gray}
              >
                {CONTINUE} <img alt={ALT_IMG} src={RightArrow} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default React.memo(AssessmentInstruction);
