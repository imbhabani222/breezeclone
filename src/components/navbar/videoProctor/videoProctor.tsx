import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const VideoProctor = () => {
  const webcamRef = useRef<any>(null);
  const [imgSrc, setImgSrc] = useState(null);
  //Take Snapshot if image - 15sec , and if video every 1-sec
  //As soon as SS is ready store in array of string and send socket event - GET_WEBCAM_SNAPSHOT_URL
  //server to client event - event name- WEBCAM_SNAPSHOT_URL , get json (AWS URL)
  //pop latest one from array of string and covert base64 to binary/blob
  //XHR call to AWS URL and its a PUT request . 5xx add retry mechanism .

  const capture = React.useCallback(() => {
    setInterval(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, 5000);
  }, [webcamRef, setImgSrc]);
  useEffect(() => {
    capture();
  }, [capture]);

  console.log(imgSrc);
  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        height={80}
        screenshotFormat="image/jpeg"
        width={100}
      />
    </>
  );
};

export default React.memo(VideoProctor);
