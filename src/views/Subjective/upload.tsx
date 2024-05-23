import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message, Popover, notification } from "antd";

import styles from "./subjective.module.scss";

import { postUploadAttchmentRequest } from "../../actions/uploadAction";
import {
  getPendingUploadFileSelector,
  getUploadFileSelector,
} from "../../selectors/problemSelector";
import {
  getSingleSolState,
  getSingleSolStateError,
} from "../../selectors/selectors";
import { postAnswerAction } from "../../actions/postAnswerActions";
import { getPatchAnswerDataSelector } from "../../selectors/questionsSelector";
import { patchAnswerActions } from "../../actions/patchAnswerActions";
import { HTMLdata } from "../../data/htmlData";
import messages from "../../constants/messages";
import purifyInnerHtml from "../../utils/innerHTML";

const { FILE_TYPE_INFO } = HTMLdata;
const { UPLOAD, UPLOAD_ATTACHMENT } = messages;

function UploadAttachment({ subPayloadData, attachmentsFile }: any) {
  let getUploadedData = useSelector(getUploadFileSelector);
  const solutionMcqData = useSelector(getSingleSolState);
  const getSingleSolError = useSelector(getSingleSolStateError);
  const [fileUploadStatus, setFileUploadStatus] = useState(false);
  const patchStatus = useSelector(getPatchAnswerDataSelector);
  const uploadFileLoading = useSelector(getPendingUploadFileSelector);

  const dispatch = useDispatch();
  const file_ref: any = useRef(null);

  const dataURItoBlob = (dataURI: any) => {
    if (!dataURI) return null;
    const binary = atob(dataURI.split(",")[1]);
    const array = [];
    for (let i = 0; i < binary?.length; i += 1) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: "image/jpeg" });
  };

  const isValidFileUploaded = (file: any) => {
    const validExtensions = [
      "png",
      "jpeg",
      "jpg",
      "zip",
      "x-zip-compressed",
      "txt",
      "pdf",
      "plain",
    ];
    const fileExtension = file.type.split("/")[1];
    console.log(fileExtension);
    return validExtensions.includes(fileExtension);
  };

  const onChange = (e: any) => {
    const fileSize = e.target.files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 50) {
      message.error("File size exceeds 50MB");
    } else {
      if (e.target.files?.length < 1) {
        return;
      }
      const file = e.target.files[0];
      if (isValidFileUploaded(file)) {
        let files = e.target.files;
        let getFileSize = e.target.files[0].size;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (e) => {
          const payload = new FormData();
          const file: any = dataURItoBlob(e.target?.result);
          payload.append("file", file);
          payload.append("upload_type", "generic");
          payload.append("filename_prefix", "");
          payload.append("name", files[0].name);
          if (getFileSize >= 53188043) {
            message.error("File size limit exceed");
          } else {
            setFileUploadStatus(true);
            dispatch(
              postUploadAttchmentRequest(
                "PLT",
                subPayloadData.username,
                payload
              )
            );
          }
        };
      } else {
        message.error("Invalid file type");
      }
    }
  };
  const postData = useCallback(() => {
    if (
      getUploadedData &&
      attachmentsFile?.length < 1 &&
      getSingleSolError === 404 &&
      getSingleSolError !== undefined
    ) {
      let attachData = [];
      attachData.push(getUploadedData.resource_uri);
      const payload = {
        attachments: attachData,
        problem: `/api/v1/problem/${subPayloadData.id}`,
        creator: `/api/v1/user/${subPayloadData.username}`,
        solution_type: "SUB",
        test_solution_set: `api/v1/testsolutionset/${subPayloadData.solSetId}`,
        answer: subPayloadData.subValue,
        test: `/api/v1/test/${subPayloadData.testDetailsSlug}`,
      };
      dispatch(postAnswerAction(subPayloadData.username, payload));
    }
  }, [dispatch, getUploadedData]);

  const patchData = useCallback(() => {
    if (
      getUploadedData &&
      getSingleSolError !== 404 &&
      (solutionMcqData?.attachments?.length > 0 ||
        solutionMcqData?.attachments?.length === 0)
    ) {
      let uploadAttatchments: any = [];
      attachmentsFile?.map((data: any) => {
        return uploadAttatchments.push(data.http);
      });
      if (fileUploadStatus && getUploadedData?.status === "OK") {
        uploadAttatchments.push(getUploadedData?.resource_uri);
      }
      const patchPayload = {
        code: "",
        choice: null,
        answer: subPayloadData.subValue,
        technology: null,
        attachments: uploadAttatchments,
        learn_feed_item: null,
        video_url: "",
        extra_data: {},
        file_based_data: null,
        creator: `/api/v1/user/${subPayloadData.username}`,
      };
      if (
        fileUploadStatus &&
        getUploadedData?.status === "OK" &&
        solutionMcqData !== undefined &&
        getSingleSolError !== 404
      ) {
        dispatch(
          patchAnswerActions(
            subPayloadData?.solSlug,
            subPayloadData?.username,
            patchPayload
          )
        );
      }
    }
  }, [dispatch, getUploadedData]);

  useEffect(() => {
    postData();
  }, [postData]);
  useEffect(() => {
    patchData();
  }, [patchData]);

  useEffect(() => {
    let key = "newKey";
    if (uploadFileLoading) {
      notification.open({
        key,
        message: "Uploading your file...",
        duration: 0,
      });
    } else {
      file_ref.current.value = "";
      notification.close(key);
    }
  }, [uploadFileLoading]);

  console.log(patchStatus);
  return (
    <div>
      <div className={styles.upload_btn_wrapper}>
        <Popover
          content={purifyInnerHtml(FILE_TYPE_INFO)}
          title={UPLOAD_ATTACHMENT}
        >
          <button className="btn">{UPLOAD}</button>
          <input
            ref={file_ref}
            className={styles.input_file}
            type="file"
            name="file"
            onChange={(e) => onChange(e)}
            accept=".pdf,.txt,.jpeg,.zip,.png"
          />
        </Popover>
      </div>
    </div>
  );
}

export default React.memo(UploadAttachment);
