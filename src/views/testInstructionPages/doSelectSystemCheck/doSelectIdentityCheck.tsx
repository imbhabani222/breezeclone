import React, { useState, useCallback, useRef } from "react";
import { Checkbox, Row, Col, Typography, Button, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import styles from "./systemCheck.module.scss";
import Webcam from "react-webcam";
import _ from "lodash";

import Loader from "../../../assets/loader.svg";
import info from "../../../assets/info.svg";
import takeSnapshot from "../../../assets/take-snapshot.svg";
import retake from "../../../assets/retake.svg";
import video_captured from "../../../assets/green-tick-circle.svg";
import capture_error from "../../../assets/red-cross.svg";

import instructionDetails from "../../../constants/instructionConstant";
import { identityArray } from "../../../data/instructionData";
import { createIdentityAction } from "../../../actions/createIdentityActions";
import { checkAction } from "../../../actions/actions";

import {
  fetchIndentityImg,
  getindentityImg,
  getindentityImgError,
  getindentityImgPending,
  getsolutionSet,
} from "../../../selectors/selectors";

const { Text } = Typography;
const {
  IDENTITY_INFO,
  IMAGE_VERIFY,
  IDENTITY_ERROR,
  BTN_ID,
  TAKE_SNAPSHOT,
  CHECKBOX_TXT,
  ALT_IMG,
  RETAKE,
  VIDEO_CAPTURED,
} = instructionDetails;

const dataURItoBlob = (dataURI: any) => {
  if (!dataURI) return null;
  const binary = atob(dataURI.split(",")[1]);
  const array = [];
  for (let i = 0; i < binary.length; i += 1) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
};
const DoSelectIdentityCheck = () => {
  const webcamRef: any = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const solutionSetData = useSelector(getsolutionSet);
  const identityImgError = useSelector(getindentityImgError);
  const identityImageLoader = useSelector(getindentityImgPending);
  const indentityImgStatus = useSelector(fetchIndentityImg);
  const identityImageData = useSelector(getindentityImg);
  const loader = <img alt="Loading" className={styles.loader} src={Loader} />;
  const dispatch = useDispatch();
  const [camPlaying, setCamStatus] = useState(true);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();

    let file: any = dataURItoBlob(imageSrc);
    setImgSrc(imageSrc);
    setCamStatus(false);
    dispatch(createIdentityAction("test", solutionSetData?.data?.id, file));
  }, [dispatch, solutionSetData?.data?.id]);
  const onChangeCheck = useCallback(
    (e) => {
      if (indentityImgStatus === 200 || !_.isEmpty(identityImageData))
        dispatch(checkAction({ checkStatus: e.target.checked }));
    },
    [dispatch, identityImageData, indentityImgStatus]
  );
  const retakeImage = useCallback(() => {
    setCamStatus(!false);
  }, []);
  let getBoolStatus = _.isEmpty(identityImageData) && identityImgError === 400;

  console.log(indentityImgStatus);
  return (
    <div className={styles.identity_check}>
      <Row>
        <div
          className={clsx({
            [styles.identity_left_content]: true,
            [styles.identity_left_content_error]: getBoolStatus,
          })}
        >
          <img alt={ALT_IMG} src={getBoolStatus ? capture_error : info} />
          <Text className={styles.identity_info_txt}>
            {getBoolStatus ? <Text>{IDENTITY_ERROR}</Text> : IDENTITY_INFO}
          </Text>
        </div>

        <Col xs={24} sm={24} md={24} lg={16}>
          {identityImageLoader ? (
            <div>
              <div className={styles.identity_left_content_loading}>
                {IMAGE_VERIFY}
                <Spin spinning={true} indicator={loader} />
              </div>
            </div>
          ) : (
            ""
          )}
          <div
            className={clsx(
              styles.testlanding_main_wrapper,
              styles.info_main_div
            )}
          >
            {identityArray.map((data, index) => {
              return (
                <div key={index} className={styles.ellipse_parent_div}>
                  <div
                    className={clsx({
                      [styles.ellipse]: true,
                      [styles.ellipseError]: getBoolStatus,
                    })}
                  ></div>
                  <div
                    className={clsx({
                      [styles.common_text_header]: true,
                      [styles.ellipse_text]: true,
                      [styles.ellipse_text_error]: getBoolStatus,
                    })}
                  >
                    {data.title}
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8}>
          <div className={styles.web_cam}>
            <div className={styles.capturedImg}>
              {indentityImgStatus === 200 ? (
                <img
                  alt={ALT_IMG}
                  src={`https://central.dev.sg1.chsh.in/rpc/proctorv2/identity/fetch/test/${solutionSetData?.data?.id}`}
                />
              ) : camPlaying ? (
                <div className={styles.webcamClass}>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                  />
                </div>
              ) : (
                <div className={clsx({ [styles.toggleDisplay]: camPlaying })}>
                  {imgSrc && <img alt={ALT_IMG} src={imgSrc} />}
                </div>
              )}
            </div>
            {camPlaying && indentityImgStatus !== 200 ? (
              <Button
                onClick={capture}
                id={BTN_ID}
                className={styles.snapshot_btn}
              >
                <img alt={ALT_IMG} src={takeSnapshot} />
                <Text>{TAKE_SNAPSHOT}</Text>
              </Button>
            ) : (
              <>
                {getBoolStatus ? (
                  <Button onClick={retakeImage} className={styles.snapshot_btn}>
                    <img alt={ALT_IMG} src={retake} />
                    <Text>{RETAKE}</Text>
                  </Button>
                ) : (
                  <div className={styles.video_captured}>
                    <img alt={ALT_IMG} src={video_captured} /> {VIDEO_CAPTURED}
                  </div>
                )}
              </>
            )}
          </div>
        </Col>
      </Row>
      <div
        className={clsx(
          styles.testlanding_main_wrapper,
          styles.checkbox_identity,
          styles.checkbox_main_div
        )}
      >
        <Checkbox
          onChange={onChangeCheck}
          className={styles.check_box_style}
          disabled={indentityImgStatus !== 200}
        ></Checkbox>
        <Text className={styles.checkbox_text_identity}>{CHECKBOX_TXT}</Text>
      </div>
    </div>
  );
};

export default React.memo(DoSelectIdentityCheck);
