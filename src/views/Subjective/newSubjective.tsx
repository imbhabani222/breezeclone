import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import Split from "react-split";

import "react-quill/dist/quill.snow.css";
import style from "./subjective.module.scss";

import jpegIcon from "../../assets/image-icon.svg";
import closeIconRed from "../../assets/close-icon-red.svg";
import zipIcon from "../../assets/ZIP-icon.svg";
import txtIcon from "../../assets/txt-icon.svg";
import listIcon from "../../assets/list_item.svg";
import pdfIcon from "../../assets/pdf-icon.svg";

import messages from "../../constants/messages";
import { dataSubjective } from "./dataSubjective";
import QuestionSubHeader from "../../components/questionSubHeader/QuestionSubHeader";

import {
  getTest,
  getSingleSolState,
  getSingleChoiceSolState,
  getSingleSolStateError,
} from "../../selectors/selectors";

import { patchAnswerActions } from "../../actions/patchAnswerActions";
import FormatText from "../../components/katexToHtml/formatText";
import UploadAttachment from "./upload";
import _debounce from "lodash/debounce";

const { DESCRIPTION_LABEL } = messages;

const { Text } = Typography;

const { SAVE, ALT_IMG } = messages;

const NewSubjective = ({
  // reportHandler,
  solutionDetails,
  currentQuestion,
  currentPage,
  currentAnswer,
  saveAnswer,
  currentAnswerExist,
  username,
  usertype,
  id,
  user_id,
  nextPage,
  slug,
  solutionSetId,
  actionDisable,
  toggleReportHandler,
}: any) => {
  const [answer, setAnswer] = useState<any>(null);
  const [actionsDisable, setActionsDisable] = useState<boolean>(false);
  const [answerExist, setCurrentAnswerExist] =
    useState<any>(currentAnswerExist);
  const [ellipsis, setEllipsis] = useState(true);
  const [attachmentsFile, setAttachmentArray] = useState<any>();
  const [cleanStatus, setCleanStatus] = useState(false);

  const testDetails = useSelector(getTest);
  const solutionMcq = useSelector(getSingleSolState);
  const solutionMcqStatus = useSelector(getSingleChoiceSolState);
  const getSingleSolError = useSelector(getSingleSolStateError);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentAnswer) {
      setAnswer(currentAnswer.answer);
    }
  }, [currentAnswer]);
  useEffect(() => {
    setActionsDisable(actionDisable);
  }, [actionDisable]);
  useEffect(() => {
    setCurrentAnswerExist(currentAnswerExist);
    if (!currentAnswerExist) {
      setAnswer(null);
    }
  }, [currentAnswerExist]);

  let patchReqParams: any;
  let payloadData = {
    user_id: user_id,
    solSlug: solutionMcq?.slug,
    usertype: usertype,
    id: id,
    username: username,
    solSetId: solutionSetId,
    subValue: answer,
    testDetailsSlug: testDetails.slug,
  };

  let disableSave = answer !== "<p><br></p>" && answer?.length ? false : true;

  let disableSubmit =
    currentAnswer?.answer === undefined ||
    disableSave ||
    solutionMcqStatus === 404 ||
    (attachmentsFile?.length === 0 &&
      (currentAnswer?.answer === "" ||
        currentAnswer?.answer === "<p><br></p>"));

  const textChangeHandler = (event: any) => {
    setAnswer(event);
    // debounceFn();
    // debounceFn(event, id);
  };

  const subHeaderHandler = () => {
    const data = dataSubjective({
      onOk: toggleReportHandler,
      onCancel: clearHander,
      disabled: solutionDetails === 404 || actionsDisable,
    });
    return <QuestionSubHeader titles={data} />;
  };

  const removeAttachment = (index: number) => {
    patchReqParams = solutionMcq?.slug;
    let arr = attachmentsFile;
    let newArr = [...arr];
    newArr.splice(index, 1);
    setAttachmentArray(newArr);
    let uploadAttatchments: any = [];
    newArr?.map((data: any) => {
      return uploadAttatchments.push(data.http);
    });
    const patchPayload = {
      code: "",
      choice: null,
      answer: answer,
      technology: null,
      attachments: uploadAttatchments,
      learn_feed_item: null,
      video_url: "",
      extra_data: {},
      file_based_data: null,
      creator: `/api/v1/user/${username}`,
    };
    dispatch(patchAnswerActions(patchReqParams, username, patchPayload));
  };
  useEffect(() => {
    let attachmentsData: any = [];
    let attachmentsArray = solutionMcq?.attachments;
    for (let i in attachmentsArray) {
      attachmentsData.push({
        http: attachmentsArray[i],
        name: attachmentsArray[i] ? /[^/]*$/.exec(attachmentsArray[i])![0] : "",
        icon: attachmentsArray[i] ? /[^.]*$/.exec(attachmentsArray[i])![0] : "",
      });
    }
    if (getSingleSolError === 404) {
      setAttachmentArray([]);
    } else {
      setAttachmentArray(attachmentsData);
    }
  }, [getSingleSolError, solutionMcq?.attachments]);

  // const  = () => {
  // };

  const clearHander = () => {
    setCleanStatus(true);
    patchReqParams = solutionMcq?.slug;
    setAnswer([]);
    const clearPayload = {
      code: "",
      choice: null,
      answer: "",
      technology: null,
      attachments: [],
      learn_feed_item: null,
      video_url: "",
      extra_data: {},
      file_based_data: null,
      creator: `/api/v1/user/${username}`,
    };
    dispatch(patchAnswerActions(patchReqParams, username, clearPayload));
  };

  const Editor = {
    toolbar: [
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const storeAnswer = (a?: any) => {
    // setAnswer(ans);

    let arr = attachmentsFile;
    let newArr = [...arr];
    let uploadAttatchments: any = [];
    newArr?.map((data: any) => {
      return uploadAttatchments.push(data.http);
    });

    if (!answerExist) {
      const payload = {
        attachments: uploadAttatchments,
        problem: `/api/v1/problem/${id}`,
        creator: `/api/v1/user/${username}`,
        solution_type: "SUB",
        test_solution_set: `api/v1/testsolutionset/${solutionSetId}`,
        answer: answer,
        test: `/api/v1/test/${testDetails.slug}`,
      };

      saveAnswer(payload);
    } else {
      const patchpayload = {
        code: "",
        choice: null,
        answer: answer,
        technology: null,
        attachments: uploadAttatchments,
        learn_feed_item: null,
        video_url: "",
        extra_data: {},
        file_based_data: null,
        creator: `/api/v1/user/${username}`,
      };
      saveAnswer(patchpayload);
    }
  };

  const handleDebounceFn = (
    event: any,
    // solId: any,
    // attachmentsFile: any,
    // getSingleSolErrorOnChange: any,
    // solutionMcqData: any,
    // solSlug: any,
    id: any
  ) => {
    setAnswer(event);

    let uploadAttatchments: any = [];
    attachmentsFile?.map((data: any) => {
      return uploadAttatchments.push(data.http);
    });

    if (event !== "<p><br></p>" && !answerExist) {
      const payload = {
        attachments: uploadAttatchments,
        problem: `/api/v1/problem/${id}`,
        creator: `/api/v1/user/${username}`,
        solution_type: "SUB",
        test_solution_set: `api/v1/testsolutionset/${solutionSetId}`,
        answer: event,
        test: `/api/v1/test/${slug}`,
      };

      saveAnswer(payload);
    } else {
      const patchpayload = {
        code: "",
        choice: null,
        answer: event,
        technology: null,
        attachments: uploadAttatchments,
        learn_feed_item: null,
        video_url: "",
        extra_data: {},
        file_based_data: null,
        creator: `/api/v1/user/${username}`,
      };
      saveAnswer(patchpayload);
    }
  };

  //const debounceFn = useCallback(_debounce(handleDebounceFn, 3000), []);

  return (
    <>
      <div className={style.container}>
        <Split
          sizes={[25, 75]}
          direction="horizontal"
          defaultValue={700}
          cursor="col-resize"
          className={style.split_flex}
        >
          <div className={style.question_container}>
            <div className={style.question_type}>
              <img src={listIcon} alt={"Img"} />
              <span>Subjective</span>
            </div>
            {currentQuestion && (
              <>
                <h2>
                  {" "}
                  {currentPage}.{currentQuestion.name}
                </h2>
                <h3>{DESCRIPTION_LABEL}</h3>

                <FormatText data={currentQuestion.description} />
              </>
            )}
          </div>
          <div className={style.editor_wrapper}>
            <div className={style.editor_container}>
              {subHeaderHandler()}
              <div className={style.quill_container}>
                <ReactQuill
                  className={style.quill_editor}
                  theme="snow"
                  modules={Editor}
                  placeholder={"Insert text here"}
                  onChange={textChangeHandler}
                  value={answer || null}
                />
                <div className={style.attachment}>Attachments</div>
                <div className={style.attachment_wrapper}>
                  <Row gutter={10}>
                    {attachmentsFile?.map((data: any, index: number) => {
                      return (
                        <Col lg={8} md={12} xs={24} sm={24}>
                          <div className={style.inner_attachment_div}>
                            <img
                              alt={ALT_IMG}
                              src={
                                data.icon === "png"
                                  ? jpegIcon
                                  : data.icon === "zip"
                                  ? zipIcon
                                  : data.icon === "txt"
                                  ? txtIcon
                                  : data.icon === "pdf"
                                  ? pdfIcon
                                  : ""
                              }
                            />
                            <a
                              href={data.http}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Text
                                style={
                                  ellipsis
                                    ? {
                                        width: 100,
                                      }
                                    : undefined
                                }
                                ellipsis={
                                  ellipsis
                                    ? {
                                        tooltip: data.name,
                                      }
                                    : false
                                }
                              >
                                {data.name}
                              </Text>
                            </a>
                            <img
                              className={style.attachment_closeIcon}
                              alt={ALT_IMG}
                              onClick={() => removeAttachment(index)}
                              src={closeIconRed}
                            />
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </div>

                {/* <p>{fileName || ""}</p> */}
              </div>
            </div>
            <div className={style.footer_actions}>
              <div className={style.upload_btn}>
                <UploadAttachment
                  subPayloadData={payloadData}
                  attachmentsFile={attachmentsFile}
                />
              </div>
              <Button
                className={style.save_btn}
                onClick={storeAnswer}
                disabled={disableSave}
              >
                {SAVE}
              </Button>
              <Button
                className={style.save_btn}
                disabled={disableSubmit}
                onClick={nextPage}
              >
                {"Submit"}
              </Button>
            </div>
          </div>
        </Split>
      </div>
    </>
  );
};

export default React.memo(NewSubjective);
