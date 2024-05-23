import ReactQuill from "react-quill";
import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "react-quill/dist/quill.snow.css";
import style from "./subjective.module.scss";
import SplitPane from "react-split-pane";
import Split from "react-split";

import messages from "../../constants/messages";
import { dataSubjective } from "./dataSubjective";

import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Typography, Row, Col } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import jpegIcon from "../../assets/image-icon.svg";
import closeIcon from "../../assets/close-icon.svg";
import closeIconRed from "../../assets/close-icon-red.svg";
import zipIcon from "../../assets/ZIP-icon.svg";
import txtIcon from "../../assets/txt-icon.svg";
import pdfIcon from "../../assets/pdf-icon.svg";

import ButtonGrp from "../../components/buttonGrp/buttonGrp";
import QuestionSubHeader from "../../components/questionSubHeader/QuestionSubHeader";
import { useDispatch, useSelector } from "react-redux";

import _debounce from "lodash/debounce";

import {
  getDeleteSelector,
  getAnswerPostDataSelector,
  getQuestionsSelector,
  getPatchAnswerDataSelector,
} from "../../selectors/questionsSelector";
import {
  getsolutionSet,
  getTest,
  getSingleSolStatePending,
  getSingleSolState,
  getIdentity,
  getSingleChoiceSolState,
  getSingleSolStateError,
} from "../../selectors/selectors";
import {
  getPendingQuestionsSelector,
  getPendingUploadFileSelector,
  getSolutionSetSelector,
} from "../../selectors/problemSelector";

import { fetchSolutionSetRequest } from "../../actions/problemActions";
import {
  questionsActions,
  getSingleProblemSolAction,
  deleteAnswerAction,
} from "../../actions/questionsAction";

import {
  getAllProblemTypes,
  getAllSolvedIds,
  stringFillerInput,
} from "../../data/utils";

import TestPagination from "../../components/testLayoutSidebar/testpadSidbar";

// import { postReportIssueRequest } from "../../actions/reportActions";
import { postAnswerAction } from "../../actions/postAnswerActions";
import { patchAnswerActions } from "../../actions/patchAnswerActions";
import FormatText from "../../components/katexToHtml/formatText";
import UploadAttachment from "./upload";
import QuestionTypeHeader from "../../components/QuestionTypeHeader/QuestionTypeHeader";
import Report from "../../components/Report/Report";
import _, { debounce } from "lodash";

import constants from "../../constants/constants";

const { Paragraph, Text } = Typography;

const { UPLOAD, SAVE, ALT_IMG } = messages;

const {
  ROUTE: { SWITCH_PATH, TEST_SECTION_SUBMIT },
} = constants;

const RichTextEditor = () => {
  const dispatch = useDispatch();
  let { id } = useParams();

  const [subValue, setSubValue] = useState<any>();
  // const patchStatus = useSelector(getPatchAnswerDataSelector);
  const allQuestions = useSelector(getQuestionsSelector);
  const solutionSet = useSelector(getSolutionSetSelector);
  // const solutionMcqPending = useSelector(getSingleSolStatePending);
  const testDetails = useSelector(getTest);
  const solutionMcq = useSelector(getSingleSolState);
  const getSingleSolDetails: any = useSelector(getIdentity);
  const getDelete = useSelector(getDeleteSelector);
  const solutionMcqStatus = useSelector(getSingleChoiceSolState);
  const mcqRequestPending = useSelector(getPendingQuestionsSelector);
  const getSingleSolError = useSelector(getSingleSolStateError);
  const getAnswerPostData = useSelector(getAnswerPostDataSelector);
  // const getPatchData = useSelector(getPatchAnswerDataSelector);
  // const uploadStatus = useSelector(getPendingUploadFileSelector);
  const getSingleSolErrorOnChange = useSelector(getSingleSolStateError);
  const solutionMcqData = useSelector(getSingleSolState);

  const [ellipsis, setEllipsis] = useState(true);
  const [attachmentsFile, setAttachmentArray] = useState<any>();
  // const [textStatus, setTextEvent] = useState(false);
  const [cleanStatus, setCleanStatus] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { usertype, user_id, username } = getSingleSolDetails;

  let patchReqParams: any;
  let payloadData = {
    user_id: user_id,
    solSlug: solutionMcq?.slug,
    usertype: usertype,
    id: id,
    username: username,
    solSetId: solutionSet.id,
    subValue: subValue,
    testDetailsSlug: testDetails.slug,
  };
  //  const allQuestions =
  //   allMcq && allMcq?.filter((val: any) => val.problem_type === "MCQ");
  // console.log(solutionMcq?.answer, " solutionMcq?.answer");
  // console.log(attachmentsFile, " attachmentsFile");
  // console.log(solutionMcq?.answer, "solutionMcq?.answer");
  let disableSubmit =
    solutionMcq?.answer === undefined ||
    solutionMcqStatus === 404 ||
    (attachmentsFile?.length === 0 &&
      (solutionMcq?.answer === "" || solutionMcq?.answer === "<p><br></p>"));

  const singleSub =
    allQuestions && allQuestions?.filter((val: any) => val.slug === id);
  useEffect(() => {
    if (solutionSet === "") {
      dispatch(fetchSolutionSetRequest(testDetails.id));
    }
  }, [dispatch, testDetails, solutionSet, allQuestions]);

  let timedSections = solutionSet.sections?.find((val: any) => val.status);
  useEffect(() => {
    if (!testDetails?.is_timed_section) {
      const problemIds =
        solutionSet &&
        solutionSet?.sections?.map((item: any) => item.problem_ids);
      dispatch(questionsActions(testDetails.id, problemIds));
    } else {
      const problemIds = solutionSet.sections?.find(
        (val: any) => val.status === "CTK" || ""
      );
      dispatch(questionsActions(testDetails.id, problemIds?.problem_ids));
    }
  }, [dispatch, solutionSet, testDetails.id, testDetails?.is_timed_section]);

  useEffect(() => {
    // if (solutionSet !== "" && !mcqRequestPending && !allQuestions) {
    //   if (timedSections !== undefined) {
    //     const problemIds = solutionSet.sections?.find(
    //       (val: any) => val.status === "CTK" || ""
    //     );
    //     dispatch(questionsActions(testDetails.id, problemIds.problem_ids));
    //   } else {
    //     const problemIds =
    //       solutionSet &&
    //       solutionSet?.sections?.map((item: any) => item.problem_ids);
    //     dispatch(questionsActions(testDetails.id, problemIds));
    //   }
    // }
    if (!solutionMcq || (solutionMcq && solutionMcq.problem.slug !== id)) {
      dispatch(
        getSingleProblemSolAction(
          usertype,
          user_id,
          "PLT",
          username,
          testDetails.slug,
          id
        )
      );
    }
    if (solutionMcq && solutionMcq.problem?.slug === id) {
      setSubValue(solutionMcq?.answer);
    }
    if (solutionMcqStatus === 404) {
      setSubValue(undefined);
    }
  }, [
    dispatch,
    solutionSet,
    testDetails.id,
    allQuestions,
    solutionMcq,
    id,
    testDetails.slug,
    usertype,
    user_id,
    username,
    solutionMcqStatus,
    mcqRequestPending,
  ]);

  useEffect(() => {
    if (getDelete?.status === 204) {
      setSubValue(undefined);
      dispatch(
        getSingleProblemSolAction(
          usertype,
          user_id,
          "PLT",
          username,
          testDetails.slug,
          id
        )
      );
    }
  }, [dispatch, getDelete, usertype, user_id, username, testDetails.slug, id]);

  useEffect(() => {
    dispatch(
      getSingleProblemSolAction(
        usertype,
        user_id,
        "PLT",
        username,
        testDetails.slug,
        id
      )
    );
  }, [
    getAnswerPostData,
    dispatch,
    usertype,
    user_id,
    username,
    testDetails.slug,
    id,
  ]);

  const [saveSubValue, setsaveSubValue] = useState();

  const handleDebounceFn = (
    event: any,
    solId: any,
    attachmentsFile: any,
    getSingleSolErrorOnChange: any,
    solutionMcqData: any,
    solSlug: any,
    id: any
  ) => {
    console.log("called");
    console.log(solutionSet, "solutionSet in debounce");
    setSubValue(event);
    let uploadAttatchments: any = [];
    attachmentsFile?.map((data: any) => {
      return uploadAttatchments.push(data.http);
    });
    patchReqParams = solutionMcq?.slug;
    console.log(event, "event debounce");
    console.log(attachmentsFile?.length, " attachmentsFile?.length debounce");
    console.log(
      getSingleSolErrorOnChange,
      " getSingleSolErrorOnChange debounce"
    );
    console.log(solutionMcqData, "solutionMcqData debounce");
    if (
      event !== "<p><br></p>" &&
      (attachmentsFile?.length < 1 || attachmentsFile?.length === undefined) &&
      (getSingleSolErrorOnChange === 404 || getSingleSolErrorOnChange === null)
    ) {
      const payload = {
        attachments: uploadAttatchments,
        problem: `/api/v1/problem/${id}`,
        creator: `/api/v1/user/${username}`,
        solution_type: "SUB",
        test_solution_set: `api/v1/testsolutionset/${solId}`,
        answer: event,
        test: `/api/v1/test/${testDetails.slug}`,
      };
      console.log("called dispatch");
      dispatch(postAnswerAction(username, payload));
    }
    if (solutionMcqData !== undefined && getSingleSolErrorOnChange !== 404) {
      const patchPayload = {
        code: "",
        choice: null,
        answer: event,
        technology: null,
        // attachments: solutionMcqData?.attachments,
        learn_feed_item: null,
        video_url: "",
        extra_data: {},
        file_based_data: null,
        creator: `/api/v1/user/${username}`,
      };
      dispatch(patchAnswerActions(solSlug, username, patchPayload));
    }
  };
  const debounceFn = useCallback(_debounce(handleDebounceFn, 10000), []);
  const textChangeHandler = (event: any) => {
    let solSlug = solutionMcq?.slug;
    setSubValue(event);
    debounceFn(
      event,
      solutionSet?.id,
      attachmentsFile,
      getSingleSolErrorOnChange,
      solutionMcqData,
      solSlug,
      id
    );
  };
  // console.log(getSingleSolErrorOnChange);

  const saveHandler = () => {
    patchReqParams = solutionMcq?.slug;
    let uploadAttatchments: any = [];
    attachmentsFile?.map((data: any) => {
      return uploadAttatchments.push(data.http);
    });
    const payload = {
      attachments: uploadAttatchments,
      problem: `/api/v1/problem/${id}`,
      creator: `/api/v1/user/${username}`,
      solution_type: "SUB",
      test_solution_set: `api/v1/testsolutionset/${solutionSet.id}`,
      answer: subValue,
      test: `/api/v1/test/${testDetails.slug}`,
    };

    const patchPayload = {
      code: "",
      choice: null,
      answer: subValue,
      technology: null,
      attachments: uploadAttatchments,
      learn_feed_item: null,
      video_url: "",
      extra_data: {},
      file_based_data: null,
      creator: `/api/v1/user/${username}`,
    };

    if (patchReqParams) {
      dispatch(patchAnswerActions(patchReqParams, username, patchPayload));
      return;
    } else if (subValue === undefined) {
    }
    dispatch(postAnswerAction(username, payload));
  };

  const subHeaderHandler = () => {
    const data = dataSubjective({
      onOk: reportHandler,
      onCancel: clearHander,
      disabled: disableSubmit,
    });
    return <QuestionSubHeader titles={data} />;
  };

  const reportHandler = () => {
    setIsModalVisible(true);
  };

  let reportData = {
    problem_slug: id,
    test_slug: testDetails?.slug,
    platform: "PLT",
    username: username,
  };

  const clearHander = () => {
    setCleanStatus(true);
    patchReqParams = solutionMcq?.slug;
    setSubValue([]);
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

  let problemType = singleSub && singleSub?.map((val: any) => val.problem_type);

  let lastSave;
  if (solutionMcqStatus !== 404) {
    lastSave = getAnswerPostData?.modified;

    console.log(getAnswerPostData, "getAnswerPostData");
  } else lastSave = "No data";

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
      answer: subValue,
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
    console.log(attachmentsArray);
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

  let solvedIds: any = getAllSolvedIds(solutionSet);

  let navigate = useNavigate();

  // const  = () => {
  // };
  let problemSlugParam = window.location.pathname.split("/")[4];
  let testSlug = window.location.pathname.split("/")[2];
  let [mcqIndex, setMcqIndex] = useState(0);
  let totalProblems = allQuestions.length;

  const OnSubmit = () => {
    let getIndex = allQuestions?.findIndex(
      (data: any) => data.slug === problemSlugParam
    );
    if (allQuestions.length === totalProblems) {
      navigate(TEST_SECTION_SUBMIT.replace(":slug", testSlug));
    }

    if (
      (mcqIndex || getIndex) >= 0 &&
      (mcqIndex || getIndex) < allQuestions.length - 1
    ) {
      setMcqIndex(getIndex + 1);
      navigate(
        SWITCH_PATH.replace(":slug", testSlug).replace(
          ":id",
          allQuestions[getIndex + 1].slug
        )
      );
    }
    saveHandler();
  };

  let allTypes: any = getAllProblemTypes(allQuestions);

  const Editor = {
    toolbar: [
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
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

  return (
    <>
      <QuestionTypeHeader
        lastSave={lastSave}
        type={allTypes}
        title={
          (subValue === undefined ||
            subValue === "" ||
            subValue === "<p><br></p>") &&
          getSingleSolError === 404
            ? "UNSOLVED"
            : "ATTEMPTED"
        }
      />
      <Report
        showModal={isModalVisible}
        reportData={reportData}
        closeModal={() => setIsModalVisible(false)}
      />
      <div className={style.container}>
        <Split
          sizes={[25, 75]}
          direction="horizontal"
          defaultValue={700}
          cursor="col-resize"
          className={style.split_flex}
        >
          <div className={style.question_container}>
            {singleSub &&
              singleSub?.map((val: any, idxx: number) => (
                <>
                  <h2>{val.name}</h2>
                  <FormatText data={val.description} />
                </>
              ))}
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
                  value={subValue || null}
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
                  saveAnswer
                  subPayloadData={payloadData}
                  currentAnswerExist
                  attachmentsFile={attachmentsFile}
                />
              </div>
              <Button className={style.save_btn} onClick={saveHandler}>
                {SAVE}
              </Button>
              <Button
                className={style.save_btn}
                disabled={disableSubmit}
                onClick={OnSubmit}
              >
                {"Submit"}
              </Button>
            </div>
          </div>
        </Split>
      </div>
      <TestPagination
        filterQuestions={allQuestions}
        singleProblem={singleSub}
        solved={solvedIds}
        callBack={() => dispatch(fetchSolutionSetRequest(testDetails.id))}
      />
    </>
  );
};

export default React.memo(RichTextEditor);
