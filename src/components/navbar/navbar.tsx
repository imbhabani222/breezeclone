import React, { useCallback, useEffect, useState } from "react";

import { Layout, Popover } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import Icon, { MoreOutlined } from "@ant-design/icons";

import { ReactComponent as help } from "../../assets/help.svg";
import { ReactComponent as wifi } from "../../assets/wifi.svg";
import { ReactComponent as camera } from "../../assets/camera.svg";

import styles from "./navbar.module.scss";
import constants from "../../constants/constants";
import messages from "../../constants/messages";
import Logo from "../logo/logo";
import Timer from "../timer/timer";
import clsx from "clsx";
import Paragraph from "antd/lib/typography/Paragraph";
import { useSelector } from "react-redux";
import { getcheckAction, getTest } from "../../selectors/selectors";
import VideoProctor from "./videoProctor/videoProctor";

const {
  HELP,
  CAMERA,
  QUESTION,
  NETWORK,
  LOGO_LABEL,
  TEXT_LABEL,
  TIME_LABEL: { H, M, S },
} = messages;

const {
  ROUTE: { FAQ, TEST_SECTION_SUBMIT },
} = constants;
const { Header } = Layout;
export interface NavbarProps {
  network?: boolean;
  que_label?: boolean;
  video_camera?: boolean;
  clock?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  network = true,
  que_label = true,
  video_camera = true,
  clock = true,
}) => {
  let location = useLocation();
  const [webCamStatus, setToggleWebCamStatus] = useState(false);
  const testDetails = useSelector(getTest);
  const proctorData = {
    videoProctor: testDetails?.settings?.proctor.video.enabled,
    imageProctor: testDetails?.settings?.proctor.snapshot,
  };
  let fullScreenStatus = proctorData.videoProctor || proctorData.imageProctor;
  const slug = location.pathname.split("/")[2];
  let navigate = useNavigate();
  const gotoFAQ = useCallback(() => {
    navigate(FAQ.replace(":slug", slug));
  }, [navigate]);

  const goToQuestionPage = useCallback(() => {
    navigate(TEST_SECTION_SUBMIT.replace(":slug", slug));
  }, [navigate]);
  const checkActionData: any = useSelector(getcheckAction);
  const answersPage = location.pathname.includes("problem/");
  const feedbackPage = location.pathname.includes(
    "/Feedback" && "/TestComplete"
  );

  let content = <span onClick={goToQuestionPage}>{QUESTION}</span>;

  const toggleWebCam = () => {
    setToggleWebCamStatus(!webCamStatus);
  };
  console.log(webCamStatus);
  return (
    <div className={styles.header}>
      <Header className={styles.site_page_header}>
        <Logo />
        {!feedbackPage && checkActionData?.data?.startTimer ? (
          <div className={styles.que_label} onClick={goToQuestionPage}>
            {QUESTION}
          </div>
        ) : null}
        <div className={styles.content_div}>
          {!feedbackPage && checkActionData?.data?.startTimer && <Timer />}
          {/* {checkActionData?.data?.startTimer !== undefined ? (
          <Icon component={camera} className={styles.icon} />
        ) : null} */}

          {!feedbackPage &&
          fullScreenStatus &&
          checkActionData?.data?.startTimer ? (
            <>
              <div onClick={toggleWebCam} className={styles.video_icon_wrapper}>
                <div className={styles.blink}></div>
                <Icon component={camera} className={styles.icon} />
                <div
                  className={clsx({
                    [styles.video_capture]: true,
                    [styles.video_capture_height]: webCamStatus,
                  })}
                >
                  <VideoProctor />
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          {network && (
            <Icon
              component={wifi}
              title={NETWORK}
              className={clsx(
                styles.icon,
                { [styles.no_network]: false },
                { [styles.poor_network]: false }
              )}
            />
          )}
          <div className={styles.helpiconbtn} onClick={gotoFAQ}>
            <Icon component={help} className={styles.icon} title={HELP} />
            <Paragraph className={styles.text}>{HELP}</Paragraph>
          </div>
          <div>
            <Popover
              placement="bottomRight"
              overlayClassName={styles.view_more_popover}
              content={content}
              trigger="click"
            >
              <MoreOutlined
                data-testid="more-popover"
                className={styles.view_more_content}
              />
            </Popover>
          </div>
        </div>
      </Header>
    </div>
  );
};
export default Navbar;
