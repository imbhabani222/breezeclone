import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Split from "react-split";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Typography, Progress, notification } from "antd";

import styles from "./videoTest.module.scss";

import record from "../../assets/take-snapshot.svg";
import preview_icon from "../../assets/preview.svg";
import resume from "../../assets/resume_icon.svg";
import stopVideo from "../../assets/stopVideo.svg";
import Loader from "../../assets/loader.svg";
import tick from "../../assets/tick.svg";
import pauseVideoImg from "../../assets/pauseVideo.svg";
import listIcon from "../../assets/list_item.svg";

import QuestionSubHeader from "../../components/questionSubHeader/QuestionSubHeader";
import { dataVideoTest } from "../FillInTheBlanks/data";
import { createVideoAction } from "../../actions/createVideoActions";
import {
  getcheckAction,
  getIdentity,
  getSingleChoiceSolState,
  getSingleSolState,
  getTest,
  getVideoUrlPendingSelector,
  getVideoUrlSelector,
} from "../../selectors/selectors";
import {
  getSolutionSetSelector,
  getStatusCodeSolutionSetSelector,
} from "../../selectors/problemSelector";
import {
  getAnswerPostPendingSelector,
  getPatchAnswerPendingSelector,
  getQuestionsSelector,
} from "../../selectors/questionsSelector";
import FormatText from "../../components/katexToHtml/formatText";
import messages from "../../constants/messages";
import clsx from "clsx";
import Report from "../../components/Report/Report";
import { WebSocketContext } from "../../utils/socket";
import _ from "lodash";

const { Text, Paragraph } = Typography;
const {
  VIDEO_TEST: {
    RECORD,
    REC_DUR,
    RESUME,
    STOP,
    SEC,
    SUBMIT,
    PAUSE,
    VID_DUR,
    DESC,
  },
  ALT_IMG,
} = messages;

const VideoTest = ({ saveAnswer }: any) => {
  const [showVideo, setStartVideoStatus] = useState(false);
  const [mediaRecorder, setmediaRecorder] = useState<any>();
  const [startRecord, setStartRecord] = useState(false);
  const [stopVidStatus, setStopVidStatus] = useState(false);
  const [recordedBlobs, setrecordedBlobs] = useState<any>([]);
  const [vidBlob, setSupperBuffer] = useState<any>();
  const [seconds, setSeconds] = useState(0);
  const [pause, setPause] = useState(true);
  const [videoSrc, setVideoSrc] = useState<any>(undefined);
  const [pasueStatus, setPauseStatus] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [patchRequest, setPatchRequest] = useState(false);
  const [requestStatus, setRequestStatus] = useState(false);
  const [vidPendingStatus, setVidStatus] = useState();
  const [postPendingStatus, setPostLoadingStatus] = useState();
  const [camStreamStatus, setVideoCamStreamStatus] = useState(false);

  const testDetails = useSelector(getTest);
  const solutionSet = useSelector(getSolutionSetSelector);
  const allQuestions = useSelector(getQuestionsSelector);
  const SingleSolution = useSelector(getSingleSolState);
  const getSingleSolStatus = useSelector(getSingleChoiceSolState);
  const getSingleSolDetails: any = useSelector(getIdentity);
  const checkActionData: any = useSelector(getcheckAction);
  const getSolSetStatus = useSelector(getStatusCodeSolutionSetSelector);
  const getVidUrlStatus = useSelector(getVideoUrlSelector);
  const getVidUrlLoadingStatus = useSelector(getVideoUrlPendingSelector);
  const getPostPendingStatus = useSelector(getAnswerPostPendingSelector);
  const getPatchPendingStatus = useSelector(getPatchAnswerPendingSelector);

  const videoRef = useRef<any>(null);
  let { id } = useParams();
  const dispatch = useDispatch();
  let recordVidRef: any = useRef();
  const ws: any = useContext(WebSocketContext);
  let sol_map_keys =
    solutionSet && solutionSet ? Object.keys(solutionSet?.solutions_map) : [];
  let findProblemId =
    allQuestions && allQuestions?.filter((data: any) => data.slug === id);
  const getSolvedIdStatus =
    findProblemId &&
    findProblemId?.some((data: any) =>
      sol_map_keys.includes(data.id.toString())
    );
  const { username } = getSingleSolDetails;
  const { signedVideoUrl, signedVideoUrlFetched } = checkActionData.data || {};
  const singleVideoTest =
    allQuestions && allQuestions?.filter((val: any) => val.slug === id);

  const getTime =
    singleVideoTest && singleVideoTest?.find((data: any) => data.slug === id);

  const reportHandler = () => {
    setIsModalVisible(true);
  };

  const subHeaderHandler = () => {
    const data = dataVideoTest({
      onOk: reportHandler,
      onCancel: "",
      disabled: "",
    });

    return (
      <div className={styles.subHeader_wrapper}>
        <QuestionSubHeader titles={data} />
      </div>
    );
  };

  const BLOB_DURATION_MS = 1 * 1000;
  const recordButton: any = document.querySelector("button#record");

  const handleSuccess = (stream: any) => {
    window.stream = stream;
    recordVidRef.current.srcObject = stream;
  };

  async function init(constraints: any) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      handleSuccess(stream);
    } catch (e) {}
  }

  const handleDataAvailable = useCallback(
    (event: any) => {
      if (event.data && event.data.size > 0) {
        recordedBlobs.push(event.data);
      }
    },
    [recordedBlobs]
  );

  const startRecording = useCallback(() => {
    let options = { mimeType: "video/webm;codecs=vp9" };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: "video/webm;codecs=vp8" };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: "video/webm" };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
          options = { mimeType: "" };
        }
      }
    }
    let mediaRecorder: any;
    try {
      mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e) {
      return;
    }
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(BLOB_DURATION_MS);

    setmediaRecorder(mediaRecorder);
  }, [BLOB_DURATION_MS, handleDataAvailable]);

  const stopRecording = useCallback(() => {
    setStopVidStatus(true);
    setStartRecord(false);
    setSeconds(0);
    setPauseStatus(false);
    setPause(true);
    setPatchRequest(false);
    setRequestStatus(false);
    mediaRecorder.stop();
    setStartVideoStatus(false);
    const superBuffer = new Blob(recordedBlobs, { type: "video/webm" });
    setSupperBuffer(superBuffer);
    setVideoSrc(window.URL.createObjectURL(superBuffer));
    setrecordedBlobs([]);
  }, [mediaRecorder, recordedBlobs]);

  useEffect(() => {
    if (seconds === getTime?.time_limit_secs) {
      stopRecording();
    }
  }, [getTime?.time_limit_secs, seconds, stopRecording]);
  useEffect(() => {
    let navigator: any;
    navigator = window.navigator;
    navigator.getMedia =
      navigator.getUserMedia || // use the proper vendor prefix
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;

    navigator.getMedia(
      { video: true },
      function () {
        setVideoCamStreamStatus(true);
      },
      function () {
        console.log("not available");
      }
    );
  }, []);
  const recordvid = (txtstatus: string) => {
    setStartRecord(true);
    if (txtstatus === "record") {
      startRecording();
      setStartVideoStatus(true);
    } else {
      stopRecording();
      recordButton.textContent = "Start Recording";
    }
  };

  const pauseRecording = useCallback(() => {
    setPause(false);
    mediaRecorder.pause();
    setPauseStatus(true);
  }, [mediaRecorder]);

  const resumeRecording = useCallback(() => {
    setPause(true);
    mediaRecorder.resume();
    setPauseStatus(false);
  }, [mediaRecorder]);

  const resumeBtn = () => {
    resumeRecording();
  };
  const pauseBtn = () => {
    pauseRecording();
  };
  let reportData = {
    problem_slug: id,
    test_slug: testDetails?.slug,
    platform: "PLT",
    username: username,
  };

  const submitVideo = () => {
    let vidData = {
      fileName: solutionSet?.id,
      mimeType: "video/webm",
      slug: `${solutionSet?.id + "-" + id}`,
      token: solutionSet?.token,
    };
    ws?.vidUrl(vidData);
    setRequestStatus(true);
  };

  const getPathFromUrl = (url: any) => {
    return url.split("?")[0];
  };
  const vidPreview = () => {
    videoRef.current.play();
  };
  //EFFECTS
  useEffect(() => {
    console.log(requestStatus);
    if (
      signedVideoUrlFetched &&
      getSolSetStatus === 200 &&
      requestStatus &&
      getVidUrlStatus?.statusCode === 200
    ) {
      if (
        getSingleSolStatus !== 200 &&
        signedVideoUrl &&
        vidPendingStatus &&
        getVidUrlStatus?.statusCode === 200
      ) {
        const vidPayload = {
          creator: `/api/v1/user/${username}`,
          problem: `/api/v1/problem/${id}`,
          solution_type: "MCQ",
          test: `/api/v1/test/${testDetails.slug}`,
          test_solution_set: `api/v1/testsolutionset/${solutionSet.id}`,
          video_url: getPathFromUrl(signedVideoUrl),
        };
        saveAnswer(vidPayload);
      }
      if (
        getSingleSolStatus === 200 &&
        signedVideoUrl &&
        getSolvedIdStatus &&
        getVidUrlStatus?.statusCode === 200 &&
        vidPendingStatus
      ) {
        const patchPayload = {
          code: "",
          choice: null,
          answer: "",
          technology: null,
          attachments: [],
          learn_feed_item: null,
          extra_data: {},
          file_based_data: null,
          video_url: getPathFromUrl(signedVideoUrl),
        };
        saveAnswer(patchPayload);
      }
    }
  }, [
    SingleSolution?.slug,
    signedVideoUrlFetched,
    getVidUrlStatus?.statusCode,
    dispatch,
    signedVideoUrl,
    getSingleSolStatus,
    id,
    patchRequest,
    solutionSet.id,
    testDetails.slug,
    username,
    vidBlob,
    getSolSetStatus,
    getSolvedIdStatus,
    requestStatus,
    getVidUrlLoadingStatus,
  ]);

  useEffect(() => {
    if (signedVideoUrlFetched && requestStatus) {
      dispatch(createVideoAction(signedVideoUrl, vidBlob));
    }
  }, [dispatch, requestStatus, signedVideoUrl, signedVideoUrlFetched, vidBlob]);

  useEffect(() => {
    if (startRecord) {
      const interval = setInterval(() => {
        if (pause && startRecord) {
          if (seconds < getTime?.time_limit_secs) {
            setSeconds(seconds + 1);
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [getTime?.time_limit_secs, pause, seconds, startRecord]);

  let switchContent = useCallback(() => {
    let pushContent = [];
    if (
      getSingleSolStatus === 200 &&
      !showVideo &&
      seconds === 0 &&
      !stopVidStatus
    ) {
      pushContent.push(
        <div className={styles.gum_video}>
          <video
            width="780"
            height="420"
            controls
            key={"jij"}
            src={SingleSolution?.video_url}
            id="recorded"
            ref={videoRef}
            playsInline
          ></video>
        </div>
      );
    }
    if (seconds === 0 && stopVidStatus && !startRecord) {
      pushContent.push(
        <div className={styles.gum_video}>
          <video
            key={"hhg"}
            width="780"
            height="420"
            controls
            src={videoSrc}
            id="recorded"
            playsInline
            ref={videoRef}
          ></video>
        </div>
      );
    }
    if (
      !showVideo &&
      !stopVidStatus &&
      seconds === 0 &&
      getSingleSolStatus !== 200
    ) {
      pushContent.push(
        <div className={styles.gum_video_empty}>
          <video key={"egd"} width="780" height="420" ref={videoRef}></video>
        </div>
      );
    }

    return pushContent;
  }, [
    seconds,
    SingleSolution?.video_url,
    getSingleSolStatus,
    startRecord,
    stopVidStatus,
    videoSrc,
    showVideo,
  ]);

  useEffect(() => {
    startt();
  });
  const startt = async () => {
    const constraints = {
      audio: true,
      video: {
        width: 780,
        height: 520,
      },
    };
    await init(constraints);
  };

  useEffect(() => {
    if (id) {
      const element: any = videoRef?.current;
      if (element) {
        element.removeAttribute("src");
        element.removeAttribute("controls");
        element.load();
      }
    }
    return () => {
      setSeconds(0);
      setPauseStatus(false);
      setStartRecord(false);
      setRequestStatus(false);
      setVideoSrc(undefined);
      setStartVideoStatus(false);
    };
  }, [id]);
  useEffect(() => {
    if (SingleSolution && getSingleSolStatus === 200) {
      const element: any = videoRef?.current;
      if (element) {
        element.src = SingleSolution?.video_url;
        element.controls = "controls";
        element.load();
      }
    }
  }, [SingleSolution, getSingleSolStatus]);

  const findCurrentQuestion =
    allQuestions && allQuestions?.find((data: any) => data.slug === id);
  const findCurrentQuestionIndex =
    allQuestions && allQuestions?.findIndex((data: any) => data.slug === id);

  useEffect(() => {
    setVidStatus(getVidUrlLoadingStatus);
    setPostLoadingStatus(getPostPendingStatus);
  }, [getPostPendingStatus, getVidUrlLoadingStatus]);
  const get_timer_percentage =
    (seconds / singleVideoTest[0]?.time_limit_secs) * 100;

  // Need to Create Notification utils //
  let key = "new key";
  useEffect(() => {
    if (vidPendingStatus) {
      notification.open({
        key,
        closeIcon: <div></div>,
        message: (
          <div className={styles.uploade_vid_loader}>
            Uploading your file...
            <img alt="Loading" className={styles.loader} src={Loader} />
          </div>
        ),
        description: false,
        duration: 0,
      });
    } else if (
      getVidUrlStatus?.statusCode === 200 &&
      requestStatus &&
      videoSrc !== undefined &&
      (!getPatchPendingStatus || !postPendingStatus)
    ) {
      notification.close(key);
    }
  }, [
    requestStatus,
    getPatchPendingStatus,
    getVidUrlStatus?.statusCode,
    key,
    postPendingStatus,
    vidPendingStatus,
    videoSrc,
  ]);
  console.log(camStreamStatus);
  return (
    <>
      <Report
        showModal={isModalVisible}
        reportData={reportData}
        closeModal={() => setIsModalVisible(false)}
      />
      <div className={styles.video_test_wrapper}>
        <Split
          sizes={[25, 75]}
          direction="horizontal"
          defaultValue={700}
          cursor="col-resize"
          className={styles.split_flex}
        >
          <div className={styles.left_content}>
            <div>
              <div className={styles.vid_type}>
                <img src={listIcon} alt="" /> <Text>Video</Text>
              </div>
              <Paragraph className={styles.problem_name}>
                {findCurrentQuestionIndex >= 0
                  ? findCurrentQuestionIndex + 1
                  : null}
                . {findCurrentQuestion?.name}
              </Paragraph>
              {singleVideoTest &&
                singleVideoTest?.map((data: any) => {
                  return (
                    <div className={styles.description}>
                      <Paragraph className={styles.desc_txt}>{DESC}</Paragraph>
                      <FormatText data={data.description} />
                      <Text className={styles.desc_txt}>{VID_DUR}</Text>
                      <Paragraph className={styles.vid_time}>
                        {data.time_limit_secs} {SEC}
                      </Paragraph>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={styles.right_content}>
            {subHeaderHandler()}
            {showVideo && (
              <div className={styles.gum_video}>
                <video
                  key={"nbg"}
                  width="780"
                  height="420"
                  ref={recordVidRef}
                  playsInline
                  autoPlay
                  muted
                ></video>
              </div>
            )}

            {showVideo && seconds !== 0 ? (
              <div style={{ display: "none" }} className={styles.gum_video}>
                <video
                  key={"asd"}
                  ref={recordVidRef}
                  playsInline
                  muted
                  autoPlay
                ></video>
              </div>
            ) : (
              ""
            )}
            {switchContent()}

            <div className={styles.button_container}>
              {!showVideo ? (
                <>
                  <Button
                    className={clsx({
                      [styles.record_btn]: true,
                      [styles.disable_btn]: !camStreamStatus,
                    })}
                    onClick={() => recordvid("record")}
                    disabled={!camStreamStatus}
                    id="record"
                  >
                    <img alt={ALT_IMG} src={record} />
                    {RECORD}
                  </Button>
                  {videoSrc !== undefined && (
                    <Button
                      className={styles.pause_btn}
                      onClick={vidPreview}
                      id="preview"
                    >
                      <img alt={ALT_IMG} src={preview_icon} />
                      Preview
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    className={styles.stop_btn}
                    onClick={stopRecording}
                    id="stop"
                  >
                    <img alt={ALT_IMG} src={stopVideo} />
                    {STOP}
                  </Button>
                  {pasueStatus ? (
                    <Button
                      className={styles.pause_btn}
                      onClick={resumeBtn}
                      id="resume"
                    >
                      <img alt={ALT_IMG} src={resume} />
                      {RESUME}
                    </Button>
                  ) : (
                    <Button
                      className={styles.pause_btn}
                      onClick={pauseBtn}
                      id="pause"
                    >
                      <img alt={ALT_IMG} src={pauseVideoImg} />
                      {PAUSE}
                    </Button>
                  )}
                </>
              )}

              <Button
                disabled={videoSrc === undefined}
                onClick={submitVideo}
                className={clsx({
                  [styles.submit_btn]: true,
                  [styles.disabled]: videoSrc === undefined,
                })}
              >
                {SUBMIT}
              </Button>
            </div>
            {seconds > 0 && (
              <div className={styles.duration}>
                <Progress percent={get_timer_percentage} showInfo={false} />
                {REC_DUR} {seconds} {SEC}
              </div>
            )}
          </div>
        </Split>
      </div>
    </>
  );
};

export default React.memo(VideoTest);
