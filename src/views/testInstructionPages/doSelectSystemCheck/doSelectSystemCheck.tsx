import React, { useState, useEffect, useCallback } from "react";
import {
  Select,
  Spin,
  Row,
  Col,
  message,
  Typography,
  Space,
  Button,
} from "antd";
import { LoadingOutlined, DownCircleTwoTone } from "@ant-design/icons";
import clsx from "clsx";
import droparrowdown from "../../../assets/dropdown.svg";
import tick from "../../../assets/tick.svg";
import audio from "../../../assets/audio.svg";
import music from "../../../assets/music.svg";
import network from "../../../assets/network.svg";
import os from "../../../assets/os.svg";
import browser from "../../../assets/browser.svg";
import webcam from "../../../assets/webcam.svg";
import mic from "../../../assets/mic.svg";
import cameraSwitch from "../../../assets/cam_off.svg";
import redcross from "../../../assets/red-cross.svg";
import user from "../../../assets/lady-img.svg";
import infoIcon from "../../../assets/Images/infoIcon.svg";
import testSound from "../../../assets/testSound.mp3";

import styles from "./systemCheck.module.scss";

import constants from "../../../constants/constants";
import instructionDetails from "../../../constants/instructionConstant";
import BrowserOSDetails from "../utilitySystemCheck/browserAndOsDetails";
import AudioVisualizer from "../utilitySystemCheck/audioVisualizer";
import { useDispatch, useSelector } from "react-redux";
import { checkAction } from "../../../actions/actions";
import { getTest } from "../../../selectors/selectors";

const { Text, Paragraph } = Typography;
const { DEFAULT_KEY, VIDEO_KEY } = constants;

const {
  //SPACE_DIRECTION,
  SYSTEM_CHECK,
  PASSED,
  FAILED,
  TEST_SYSTEM,
  OS,
  BROWSER,
  TEST_URL,
  CHECK_SOUND,
  CHK_CAM,
  CHK_MIC,
  CHK_VIDEO,
  CHECKING,
  //PLAY_SOUND,
  //PLAY_TO_HEAR,
  ID_MYAUDIO,
  ALT_IMG,
  INTERNET_SPEED,
  //SOUND,
  AUDIO_TYPE_MPEG,
  MAKE_SOUND,
  VIDEO,
  AUDIO_TYPE_OGG,
  MICROPHONE,
  LOW_SPEED,
  MBPS,
  FEATURE_NOT_SUPPORTED,
  DEFAULT_CAM,
  DEFAULT_MIC,
  DEFAULT_SPEAK,
  CAM_OFF,
  WINDOWS,
  WIN11_OR_LATER,
  PF_VERSION,
  WEBCAM_BLOCKED,
} = instructionDetails;
const { Option } = Select;
declare global {
  interface Window {
    stream: any;
  }
}
declare global {
  interface navigator {
    userAgent: "node";
  }
}

type TestDetails = {
  videoProctor: boolean;
  imageProctor: boolean;
};
const DoSelectSystemCheck: React.FC<TestDetails> = ({
  videoProctor,
  imageProctor,
}) => {
  const [winVersion, setWinVersion] = useState(null);
  const testDetails = useSelector(getTest);
  const [videoStatus, setVideoStatus] = useState(undefined);
  const antIcon = <LoadingOutlined style={{ fontSize: 15 }} spin />;
  const dispatch = useDispatch();
  const [systemInfo, setSystemInfo] = useState({
    browser: "",
    browserMajorVersion: 0,
    browserVersion: "",
    os: "",
    osVersion: "",
  });
  const [downloadSpeed, setDownloadSpeed] = useState<any>(null);
  const [inputAudioDd, setgetInputAudioArray] = useState([]);
  const [outputAudioDd, setgetOutAudioArray] = useState([]);
  const [videoDd, setgetVideoArray] = useState([]);
  const [handleMemoryLeak, setMemoryStatus] = useState(true);
  const [speakerVal, setSpeakersDeviceId] = useState(DEFAULT_KEY);
  const data = true;
  const proctorData = {
    proctor: testDetails?.settings?.proctor.enabled,
    videoProctor: testDetails?.settings?.proctor?.video.enabled,
    imageProctor: testDetails?.settings?.proctor.snapshot,
  };
  let navigator: any;
  navigator = window.navigator;
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  const playAudio = useCallback(async () => {
    const audio: any = document.getElementById(ID_MYAUDIO);
    try {
      await audio.setSinkId(speakerVal);
      audio.play();
    } catch (err) {
      message.error(FEATURE_NOT_SUPPORTED);
    }
  }, [speakerVal]);

  const getDownloadSpeed = useCallback(() => {
    let startTime: number, endTime: number;
    let testConnectionSpeed: any = {
      imageAddr: TEST_URL,
      downloadSize: 2707459,
      mbps_max: 0,
      cb: null,
      run: (mbps_max: string, cb: string) => {
        testConnectionSpeed.mbps_max = parseFloat(mbps_max)
          ? parseFloat(mbps_max)
          : 0;
        testConnectionSpeed.cb = cb;
        testConnectionSpeed.InitiateSpeedDetection();
      },
      InitiateSpeedDetection: () => {
        window.setTimeout(testConnectionSpeed.MeasureConnectionSpeed, 1);
      },
      result: () => {
        let duration = (endTime - startTime) / 1000;
        let bitsLoaded = testConnectionSpeed.downloadSize * 8;
        let speedBps: any = (bitsLoaded / duration).toFixed(2);
        let speedKbps: any = (speedBps / 1024).toFixed(2);
        let speedMbps = (speedKbps / 1024).toFixed(2);
        testConnectionSpeed.cb(speedMbps);
      },
      MeasureConnectionSpeed: () => {
        let download = new Image();
        download.onload = () => {
          endTime = new Date().getTime();
          testConnectionSpeed.result();
        };
        startTime = new Date().getTime();
        let cacheBuster = `?nnn=${startTime}`;
        download.src = testConnectionSpeed.imageAddr + cacheBuster;
      },
    };
    testConnectionSpeed.run(2, (mbps: any) => {
      setDownloadSpeed(mbps);
    });
  }, []);
  const systmeInfo = useCallback(() => {
    let data: any = BrowserOSDetails();
    setSystemInfo(data);
  }, []);
  const getAudioInput = useCallback(async () => {
    let getAllMediaDetails = [];
    let deviceInfos = await navigator.mediaDevices.enumerateDevices();
    for (let i = 0; i !== deviceInfos.length; ++i) {
      const deviceInfo = deviceInfos[i];
      getAllMediaDetails.push({
        deviceId: deviceInfo.deviceId,
        groupId: deviceInfo.groupId,
        kind: deviceInfo.kind,
        options: deviceInfo.label,
      });
    }
    let getInputAudioArray: any = getAllMediaDetails.filter(
      (data) => data.kind === "audioinput"
    );
    let getOutAudioArray: any = getAllMediaDetails.filter(
      (data) => data.kind === "audiooutput"
    );
    let getVideoArray: any = getAllMediaDetails.filter(
      (data) => data.kind === "videoinput"
    );
    setgetInputAudioArray(getInputAudioArray);
    setgetOutAudioArray(getOutAudioArray);
    setgetVideoArray(getVideoArray);
  }, []);
  const openWebcam = useCallback(() => {
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream: any) => {
        const videoElement: any = document.querySelector(VIDEO_KEY);
        if (videoElement) {
          setVideoStatus(videoElement);
          videoElement.srcObject = stream;
        }
      },
      (err: Error) => console.error(err)
    );
  }, []);
  const gotStream = useCallback((stream) => {
    window.stream = stream;
    let element: any = document.querySelector(VIDEO_KEY);
    element.srcObject = stream;
    return navigator.mediaDevices.enumerateDevices();
  }, []);
  const getWinVersion = useCallback(() => {
    navigator.userAgentData
      .getHighEntropyValues([PF_VERSION])
      .then((ua: any) => {
        if (navigator.userAgentData.platform === WINDOWS) {
          const majorPlatformVersion = parseInt(
            ua.platformVersion.split(".")[0]
          );
          if (majorPlatformVersion >= 13) {
            let winorlater: any = WIN11_OR_LATER;
            setWinVersion(winorlater);
          } else {
            setWinVersion(null);
          }
        }
      });
  }, []);
  const handleError = useCallback((error) => {}, []);
  const onChangeCamera = useCallback(
    (value) => {
      const constraints = {
        audio: false,
        video: { deviceId: value },
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(gotStream)
        .catch(handleError);
    },
    [gotStream, handleError]
  );
  useEffect(() => {
    if (parseInt(downloadSpeed) > 2) {
      dispatch(checkAction({ systemCheckStatus: true }));
    }
    if (handleMemoryLeak) {
      getDownloadSpeed();
    }
    getWinVersion();
    systmeInfo();
    if (proctorData.videoProctor || proctorData.imageProctor) {
      openWebcam();
    }
    dispatch(checkAction({ videoStatus: videoStatus }));
    return () => {
      setMemoryStatus(false);
    };
  }, [
    handleMemoryLeak,
    getWinVersion,
    getDownloadSpeed,
    systmeInfo,
    getAudioInput,
    openWebcam,
    dispatch,
    videoStatus,
    proctorData.videoProctor,
    proctorData.imageProctor,
    downloadSpeed,
  ]);

  console.log(parseInt(downloadSpeed));
  return (
    <div className={styles.system_check_main_div}>
      <Row gutter={16}>
        <Col
          xs={24}
          sm={24}
          md={!(videoProctor || imageProctor) ? 12 : 24}
          lg={12}
        >
          <div className={styles.col_div}>
            <div className={styles.system_check_card}>
              <Paragraph className={styles.system_check_card_header}>
                {SYSTEM_CHECK}{" "}
                {downloadSpeed ? (
                  parseInt(downloadSpeed) > 2 ? (
                    <Text>{PASSED}</Text>
                  ) : (
                    <Text className={styles.failed_text}>{FAILED}</Text>
                  )
                ) : null}
              </Paragraph>
              <div className={styles.system_check_content}>
                <img
                  className={styles.left_check_icon}
                  alt={ALT_IMG}
                  src={network}
                />
                <ul>
                  <li className={styles.system_check_content_header}>
                    {INTERNET_SPEED}
                    {downloadSpeed !== null && downloadSpeed > 2 ? (
                      <img
                        className={styles.right_check_icon}
                        alt={ALT_IMG}
                        src={tick}
                      />
                    ) : downloadSpeed !== null && downloadSpeed < 2 ? (
                      <img
                        className={styles.right_check_icon}
                        alt={ALT_IMG}
                        src={redcross}
                      />
                    ) : (
                      <Spin
                        className={styles.right_check_icon}
                        indicator={antIcon}
                      />
                    )}
                  </li>
                  <li className={styles.system_check_content_subheader}>
                    {downloadSpeed
                      ? downloadSpeed + (downloadSpeed < 2 ? LOW_SPEED : MBPS)
                      : CHECKING}
                  </li>
                </ul>
              </div>
              <div className={styles.system_check_content}>
                {data ? (
                  <img
                    className={styles.left_check_icon}
                    alt={ALT_IMG}
                    src={os}
                  />
                ) : (
                  <Spin className={styles.spin_icon} indicator={antIcon} />
                )}
                <ul>
                  <li className={styles.system_check_content_header}>
                    {OS}
                    {data ? (
                      <img
                        className={styles.right_check_icon}
                        alt={ALT_IMG}
                        src={tick}
                      />
                    ) : null}
                  </li>
                  <li className={styles.system_check_content_subheader}>
                    {data
                      ? `${systemInfo.os} ${
                          systemInfo.os === "Windows" && winVersion !== null
                            ? winVersion
                            : systemInfo.osVersion
                        }`
                      : CHECKING}
                  </li>
                </ul>
              </div>

              <div className={styles.system_check_content}>
                {data ? (
                  <img
                    className={styles.left_check_icon}
                    alt={ALT_IMG}
                    src={browser}
                  />
                ) : (
                  <Spin className={styles.spin_icon} indicator={antIcon} />
                )}
                <ul>
                  <li className={styles.system_check_content_header}>
                    {BROWSER}
                    {data ? (
                      <img
                        className={styles.right_check_icon}
                        alt={ALT_IMG}
                        src={tick}
                      />
                    ) : null}
                  </li>
                  <li className={styles.system_check_content_subheader}>
                    {data
                      ? `${systemInfo.browser} ${systemInfo.browserVersion}`
                      : CHECKING}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={!(videoProctor || imageProctor) ? 12 : 24}
          lg={12}
          className={clsx({
            [styles.right_col]: true,
            [styles.nonProctor_img]: !(videoProctor || imageProctor),
          })}
        >
          {!(videoProctor || imageProctor) ? (
            <img alt={ALT_IMG} src={user} />
          ) : (
            <div className={styles.col_div}>
              <div className={styles.system_check_card}>
                <Paragraph className={styles.system_check_card_header}>
                  {TEST_SYSTEM}
                  <span
                    className={clsx({
                      [styles.videoStatus]: videoStatus === undefined,
                    })}
                  >
                    {videoStatus !== undefined ? "Passed" : "Failed"}
                  </span>
                </Paragraph>
                <div className={styles.test_check_array}>
                  {/* <div
                    className={clsx(
                      styles.system_check_content_right,
                      styles.system_check_content
                    )}
                  >
                    <Row className={styles.test_system_width}>
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <Paragraph
                          className={clsx(
                            styles.system_check_content_header,
                            styles.right_content
                          )}
                        >
                          {SOUND}
                        </Paragraph>
                        <div className={styles.d_flex}>
                          <img
                            className={clsx(
                              styles.custom_margin,
                              styles.speaker_icon
                            )}
                            alt={ALT_IMG}
                            src={audio}
                          />
                          <Select
                            onChange={onChangeSpeaker}
                            className={styles.dd_radius}
                            defaultValue={DEFAULT_SPEAK}
                          >
                            {outputAudioDd.map((data: any, index) => {
                              return (
                                <Option key={index} value={data.deviceId}>
                                  {data.options === ""
                                    ? DEFAULT_SPEAK
                                    : data.options}
                                </Option>
                              );
                            })}
                          </Select>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <div className={styles.responsive_col}>
                          <Space direction={"vertical"} size={1}>
                            <Text
                              className={styles.system_check_content_header}
                            >
                              {CHECK_SOUND}
                            </Text>
                            <Text className={styles.test_info_txt}>
                              {PLAY_TO_HEAR}
                            </Text>
                            <Button
                              onClick={playAudio}
                              className={styles.play_sound_btn}
                            >
                              <img alt={ALT_IMG} src={music} /> {PLAY_SOUND}
                            </Button>
                          </Space>
                          <audio id={ID_MYAUDIO}>
                            <source src={testSound} type={AUDIO_TYPE_OGG} />
                            <source src={testSound} type={AUDIO_TYPE_MPEG} />
                          </audio>
                        </div>
                      </Col>
                    </Row>
                  </div> */}
                  <div
                    className={clsx(
                      styles.system_check_content_right,
                      styles.system_check_content
                    )}
                  >
                    <Row className={styles.test_system_width}>
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <Paragraph
                          className={clsx(
                            styles.system_check_content_header,
                            styles.right_content
                          )}
                        >
                          {CHK_MIC}
                        </Paragraph>
                        <div className={styles.d_flex}>
                          <img
                            className={clsx(
                              styles.custom_margin,
                              styles.mic_icon
                            )}
                            alt={ALT_IMG}
                            src={mic}
                          />
                          <Select
                            suffixIcon={<img src={droparrowdown} />}
                            className={styles.dd_radius}
                            defaultValue={DEFAULT_MIC}
                          >
                            {inputAudioDd.map((data: any, index) => {
                              return (
                                <Option key={index} value={data.deviceId}>
                                  {data.options === ""
                                    ? DEFAULT_MIC
                                    : data.options}
                                </Option>
                              );
                            })}
                          </Select>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <div className={styles.responsive_col}>
                          <Space direction={"vertical"} size={1}></Space>
                          <AudioVisualizer />
                          <Text className={styles.test_info_txt}>
                            {MAKE_SOUND}
                          </Text>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div
                    className={clsx(
                      styles.system_check_content_right,
                      styles.system_check_content
                    )}
                  >
                    <Row className={styles.test_system_width}>
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <Paragraph
                          className={clsx(
                            styles.system_check_content_header,
                            styles.right_content
                          )}
                        >
                          {CHK_VIDEO}
                        </Paragraph>
                        <div className={styles.d_flex}>
                          <img
                            className={styles.custom_margin}
                            alt={ALT_IMG}
                            src={webcam}
                          />
                          <Select
                            suffixIcon={<img src={droparrowdown} />}
                            onChange={onChangeCamera}
                            className={styles.dd_radius}
                            defaultValue={DEFAULT_CAM}
                          >
                            {videoDd.map((data: any, index) => {
                              return (
                                <Option key={index} value={data.deviceId}>
                                  {data.options === ""
                                    ? DEFAULT_CAM
                                    : data.options}
                                </Option>
                              );
                            })}
                          </Select>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={24} lg={12} xl={12}>
                        <div className={styles.responsive_col}>
                          <Space direction={"vertical"}>
                            <div className={styles.camera_screen}>
                              {videoStatus === undefined ? (
                                <>
                                  <Space>
                                    <Text>{CAM_OFF}</Text>
                                  </Space>
                                  <img alt={ALT_IMG} src={cameraSwitch} />
                                </>
                              ) : null}
                              <video
                                className={styles.systemCheck_video}
                                playsInline
                                autoPlay
                              ></video>
                            </div>
                            <Text className={styles.test_info_txt}>
                              {CHK_CAM}
                            </Text>
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div>
                    {videoStatus === undefined ? (
                      <Paragraph className={styles.videoStatusInfo}>
                        <img alt={ALT_IMG} src={infoIcon} />
                        {WEBCAM_BLOCKED}
                      </Paragraph>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(DoSelectSystemCheck);
