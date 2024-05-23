import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Paragraph from "antd/lib/typography/Paragraph";

import infoIcon from "../../assets/Images/infoIcon.svg";

import styles from "../../App.module.scss";

import messages from "../../constants/messages";
import {
  getcheckAction,
  getIdentity,
  getTest,
  getUserTypeData,
} from "../../selectors/selectors";
import BreezeModal from "../../components/modal/modal";
import purifyInnerHtml from "../../utils/innerHTML";
import { stringFiller } from "../../data/utils";
import { HTMLdata } from "../../data/htmlData";
import constants from "../../constants/constants";
import { checkAction } from "../../actions/actions";
import { finishTestRequest } from "../../actions/problemActions";
import { getSolutionSetSelector } from "../../selectors/problemSelector";
import { WebSocketContext } from "../../utils/socket";
const {
  ROUTE: { FEEDBACK },
} = constants;

const FullScreen = () => {
  const testDetails = useSelector(getTest);
  const checkActionData: any = useSelector(getcheckAction);
  const candidateSolSet = useSelector(getUserTypeData);
  const [enableFullScreen, setFullScreen] = useState(false);
  const [getFullScreenStatus, setFullScreenStatus] = useState(false);
  const [toleranceModal, setToleranceStatus] = useState(false);
  const [redirectModal, setRedirectStatus] = useState(false);
  let [toleranceCount, setToleranceCount] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const ws: any = useContext(WebSocketContext);
  const solSet = useSelector(getSolutionSetSelector);
  const identityData: any = useSelector(getIdentity);
  const testStatus = checkActionData?.data?.startTimer;
  const proctorData = {
    proctor: testDetails?.settings?.proctor.enabled,
    videoProctor: testDetails?.settings?.proctor.video.enabled,
    imageProctor: testDetails?.settings?.proctor.snapshot,
  };
  let warningStatus =
    testDetails?.settings?.proctor?.browser_tolerance?.warning;
  let fullScreenStatus =
    proctorData.proctor || proctorData.videoProctor || proctorData.imageProctor;
  let browserToleranceStatus =
    testDetails?.settings?.proctor?.browser_tolerance?.enabled;

  const slug = location.pathname.split("/")[2];
  const getPathName = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );
  const {
    TYPE_RECTFILLED,
    BROWSER_TOLERANCE_INFO,
    ALT_IMG,
    BROWSER_FULLSCREEN,
  } = messages;
  const goToFeedBackPage = () => {
    dispatch(checkAction({ startTimer: false, duration: 0 }));
    navigate(FEEDBACK.replace(":slug", slug));
  };
  const goToFullscreen = () => {
    let el = document.documentElement;
    el.requestFullscreen();
  };
  const closeModal = () => {
    setToleranceStatus(false);
  };
  const data = {
    buttons: [
      {
        type: TYPE_RECTFILLED,
        display: "Enable Fullscreen",
        onClick: goToFullscreen,
      },
    ],
  };
  const toleranceData = {
    buttons: [
      {
        type: TYPE_RECTFILLED,
        display:
          getFullScreenStatus && !toleranceModal
            ? "Enable Fullscreen"
            : "Continue",
        onClick: getFullScreenStatus ? goToFullscreen : closeModal,
      },
    ],
  };
  const redirectData = {
    buttons: [
      {
        type: TYPE_RECTFILLED,
        display: "Proceed to Feedback Page",
        onClick: goToFeedBackPage,
      },
    ],
  };
  useEffect(() => {
    window.onbeforeunload = () => true;
    return () => {
      window.onbeforeunload = null;
    };
  }, []);
  const document: any = window.document;
  const fullScreenDisabled = useCallback(() => {
    const fullScreenDisabled =
      document.fullscreen === false ||
      document.mozFullScreen === false ||
      document.webkitIsFullScreen === false ||
      document.fullscreenElement === null;
    if (fullScreenDisabled && toleranceCount !== 0) {
      setFullScreen(true);
      setToleranceStatus(false);
      setFullScreenStatus(true);
      return;
    }
    if (toleranceModal && fullScreenDisabled && toleranceCount !== 0) {
      setToleranceStatus(true);
      setFullScreen(false);
      setFullScreenStatus(false);
      return;
    } else {
      setFullScreen(false);
      setFullScreenStatus(false);
      setToleranceStatus(false);
      return;
    }
  }, []);
  useEffect(() => {
    const enableFullScreenTracking = () => {
      document.addEventListener("fullscreenchange", fullScreenDisabled, false);
      document.addEventListener(
        "mozfullscreenchange",
        fullScreenDisabled,
        false
      );
      document.addEventListener(
        "webkitfullscreenchange",
        fullScreenDisabled,
        false
      );
      document.addEventListener(
        "msfullscreenchange",
        fullScreenDisabled,
        false
      );
    };
    enableFullScreenTracking();
  }, [document, fullScreenDisabled]);

  useEffect(() => {
    setFullScreen(fullScreenStatus);
    setFullScreenStatus(fullScreenStatus);
  }, [fullScreenStatus]);
  let getCountFromLocal: any = localStorage.getItem("BrowserTcount");

  useEffect(() => {
    if (
      testStatus !== undefined &&
      (fullScreenStatus || browserToleranceStatus || warningStatus)
    ) {
      if (getCountFromLocal === "undefined" || getCountFromLocal === "0") {
        localStorage.setItem(
          "BrowserTcount",
          toleranceCount === 0
            ? "0"
            : testDetails?.settings?.proctor?.browser_tolerance?.count.toString()
        );
      }

      window.onblur = function (e) {
        ws?.onBlurEvent();
        let getCount: any = localStorage.getItem("BrowserTcount");
        let toNumber = getCount
          ? parseInt(getCount) > 0
            ? parseInt(getCount) - 1
            : 0
          : 0;
        setToleranceStatus(false);
        if (
          toleranceCount !== 0 &&
          parseInt(getCount) !== parseInt(getCount) - 1
        ) {
          setToleranceStatus(true);
        }

        localStorage.setItem("BrowserTcount", toNumber.toString());
        setToleranceCount(toNumber);
        if (browserToleranceStatus) {
          setFullScreen(false);
        }
      };
      window.onfocus = function (e) {
        ws?.onFocusEvent();
      };
    }
  }, [
    toleranceCount,
    ws,
    fullScreenStatus,
    browserToleranceStatus,
    warningStatus,
    getCountFromLocal,
    testDetails?.settings?.proctor?.browser_tolerance?.count,
    testStatus,
  ]);
  useEffect(() => {
    if (
      toleranceCount === 0 &&
      proctorData?.proctor &&
      testDetails?.settings?.proctor?.browser_tolerance?.count !== -1
    ) {
      setFullScreen(false);
      setToleranceStatus(false);
      setRedirectStatus(true);
      setTimeout(() => {
        dispatch(checkAction({ startTimer: false, duration: 0 }));
        dispatch(finishTestRequest(solSet.id, identityData.username));
        navigate(FEEDBACK.replace(":slug", slug));
      }, 5000);
    }
  }, [
    navigate,
    proctorData?.proctor,
    slug,
    toleranceCount,
    testDetails?.settings?.proctor?.browser_tolerance?.count,
    dispatch,
    solSet.id,
    identityData.username,
  ]);

  useEffect(() => {
    if (getPathName === "Feedback" || "TestComplete") {
      setFullScreen(false);
      setToleranceStatus(false);
      setRedirectStatus(false);
    }
  }, [getPathName]);
  let type = testDetails?.test_type_verbose;
  useEffect(() => {
    let getCountFromLocal: any = localStorage.getItem("BrowserTcount");
    if (getCountFromLocal === "0") {
      setToleranceStatus(false);
    }
  }, []);
  useEffect(() => {
    if (
      testStatus !== undefined &&
      (fullScreenStatus || browserToleranceStatus || warningStatus)
    ) {
      setFullScreen(true);
    }
  }, [fullScreenStatus, testStatus, browserToleranceStatus, warningStatus]);

  useEffect(() => {
    if (
      testStatus !== undefined &&
      (fullScreenStatus || browserToleranceStatus || warningStatus)
    ) {
      console.log("PROCTOR INT SUCCESS");
      ws?.fingerPrint();
    }
  }, [browserToleranceStatus, fullScreenStatus, testStatus, warningStatus, ws]);
  return (
    <>
      {testStatus !== undefined &&
      (fullScreenStatus || browserToleranceStatus || warningStatus) ? (
        <div>
          <BreezeModal
            modalHead={false}
            modalData={data}
            visible={enableFullScreen}
            showContent={true}
            width={720}
            Content={
              <div className={styles.enable_fullscreen}>
                {purifyInnerHtml(stringFiller(BROWSER_FULLSCREEN, { type }))}
              </div>
            }
          />
          {browserToleranceStatus ? (
            <BreezeModal
              modalHead={false}
              modalData={toleranceData}
              visible={toleranceModal}
              showContent={true}
              width={780}
              Content={
                <div className={styles.enable_fullscreen}>
                  <Paragraph className={styles.user_name}>
                    Hey {candidateSolSet?.data?.user?.first_name} !
                  </Paragraph>
                  {BROWSER_TOLERANCE_INFO}

                  {warningStatus ? (
                    <Paragraph>
                      You will get a maximum of
                      <span className={styles.user_name}>
                        {" "}
                        {toleranceCount}{" "}
                      </span>
                      more warnings. before terminating your test session!
                    </Paragraph>
                  ) : (
                    ""
                  )}
                </div>
              }
            />
          ) : (
            ""
          )}
          <BreezeModal
            modalData={redirectData}
            visible={redirectModal}
            showContent={true}
            width={780}
            modalHead={false}
            Content={
              <div className={styles.enable_fullscreen}>
                <Paragraph>
                  {" "}
                  {purifyInnerHtml(HTMLdata.REDIRECT_MESSAGE)}
                </Paragraph>
              </div>
            }
          />
        </div>
      ) : null}
    </>
  );
};
export default React.memo(FullScreen);
