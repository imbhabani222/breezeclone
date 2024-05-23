import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";

import "react-quill/dist/quill.snow.css";
import style from "./coding.module.scss";

import appStyle from "../../App.module.scss";

import closeIcon from "../../assets/closeX.svg";

import "./coding.module.scss";
import BreezeModal from "../../components/modal/modal";

import Split from "react-split";

import { getIdentity, getSingleSolState } from "../../selectors/selectors";

import FormatText from "../../components/katexToHtml/formatText";

import SidebarMenu from "../../components/sidebarMenu/sidebarMenu";
import clsx from "clsx";

import messages from "../../constants/messages";
import NewRunCodeContainer from "./newRunCode";
import stub_data from "../../utils/scr_default_stub.json";

import listIcon from "../../assets/list_item.svg";
import QuestionTypeHeader from "../../components/QuestionTypeHeader/QuestionTypeHeader";
import { getAnswerPostDataSelector } from "../../selectors/questionsSelector";
import { DataCodingFun } from "./dataCoding";
import RunCodeContainer from "./runCodeContainer";
import CommonRunCode from "./commonRunCode";

/**
 * Some trouble with scope in the onSave() function that gets called from
 * the library, prevents it from reading data properly from react's state
 */
let editorHeight = (window.innerHeight * 90) / 100 - 53 - 12;

const {
  CODING: { CODING, RELOAD_STUB, RELOAD_STUB_CONTENT },
} = messages;

const NewCoding = ({
  reportHandler,
  solutionDetails,
  currentQuestion,
  currentPage,
  currentAnswer,
  saveAnswer,
  clearHandler,
  currentAnswerExist,
  // username,
  id,
  slug,
  nextPage,
  solutionSetId,
  actionDisable,
  toggleReportHandler,
  testName,
}: any) => {
  const editorRef = useRef<any>(null);

  //   const allQuestions = useSelector(getQuestionsSelector);
  const getIdentityDetails: any = useSelector(getIdentity);
  // const solution = useSelector(getSingleSolState);

  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("javascript");
  const [codeValue, setCodeValue] = useState();
  const [newLanguage, setnewLanguage] = useState("");
  const [showReplaceModal, setshowReplaceModal] = useState(false);
  const [codeEditor, setCodeEditor] = useState(null as any);
  const [closeQuestion, setCloseQuestion] = useState(false);
  const [statusBar, setStatusbar] = useState("");
  const [activeKey, setactiveKey] = useState("1");

  const getAnswerPostData = useSelector(getAnswerPostDataSelector);

  const { user_id, username } = getIdentityDetails;
  let lastSave;
  if (solutionDetails !== 404) {
    lastSave = getAnswerPostData?.modified;
  } else lastSave = "No data";

  let getDefaultLanguages = currentQuestion?.stubs;
  let stubs = Object.keys(getDefaultLanguages);

  const changeEditorTheme = useCallback(() => {
    setTheme(theme === "light" ? "vs-dark" : "light");
    if (codeEditor)
      codeEditor.changeTheme(theme === "light" ? "vs-dark" : "light");
  }, [codeEditor, theme]);

  useEffect(() => {
    const _window: any = window;
    const element = document.getElementById("code-container");
    if (
      _window.firebolt &&
      user_id &&
      username &&
      user_id !== "" &&
      username !== "" &&
      id &&
      id !== ""
    ) {
      console.log(
        element?.clientHeight,
        element?.clientWidth,
        editorHeight,
        "Size"
      );
      const _stubs: any = stub_data;
      const { head, tail, body } = _stubs["javascript"];

      const editorConfig = {
        id: "code-editor",
        language: "javascript",
        dimension: {
          height: element?.clientHeight ? element?.clientHeight - 110 : 340,
          width: element?.clientWidth || 340,
        },
        value: head + body + tail,
        theme: theme,
        stub: head + body + tail,
        userId: user_id,
        username: username,
        uniqueSlug: id,
        proctor: false,
        readonly: false,
        intellisense: false,
        codeQuality: false,
        commands: {
          save: () => {},
        },
        codeLockLength: {
          head: 4,
          tail: 2,
        },
        callBacks: {
          onLoadEditor: (e: any) => {
            console.log("Editor Loaded...", e);
            // setCodeEditor(e);
          },
          onContentChange: (e: any) => {
            setCodeValue(e);
          },
          onCursorPositionChange: ({ lineNumber, column }: any) => {
            setStatusbar(`Ln ${lineNumber}, Col ${column}`);
          },
          onCursorSelectionChange: ({
            lineNumber,
            selectionLength,
            column,
          }: any) => {
            if (selectionLength)
              setStatusbar(
                `Ln ${lineNumber}, Col ${column} (${selectionLength} Selected)`
              );
          },
          onMultiCursorChange: ({ selectionCount }: any) => {
            if (selectionCount) setStatusbar(`${selectionCount} selections`);
          },
          onIntellisenseStatusChange: () => {},
          onReloadStub: () => {},
        },
      };
      setCodeEditor(new _window.firebolt.CodeEditor(editorConfig));
    }
  }, [user_id, username, id, theme]);

  // console.log(statusBar, "status Bar");

  useEffect(() => {}, []);

  const menuOpenQuestion = () => {
    setCloseQuestion(!closeQuestion);
  };

  const handleClose = () => {
    setCloseQuestion(true);
  };

  const handleLanguage = useCallback((e: any) => {
    setnewLanguage(e);
    setshowReplaceModal(true);
  }, []);
  // console.log(language, "LangquesyionType");

  const replaceCode = useCallback(
    (key: any) => {
      setactiveKey(key);
      setshowReplaceModal(false);
      const _stubs: any = stub_data;
      const { head, body, tail } = _stubs[newLanguage] || {};
      setLanguage(newLanguage);
      if (codeEditor && codeEditor.changeLanguage) {
        codeEditor.changeLanguage(
          newLanguage,
          head + body + tail,
          head + body + tail,
          {
            head: 0,
            tail: 0,
          }
        );
      }
    },
    [codeEditor, newLanguage]
  );

  const { TYPE_RECTFILLED } = messages;

  const data = {
    buttons: [
      {
        type: "rectOutline",
        display: "No Don't replace my code",
        onClick: () => {
          setshowReplaceModal(false);
        },
      },
      {
        type: TYPE_RECTFILLED,
        display: "Yes, replace & save my code",
        onClick: replaceCode,
      },
    ],
  };

  let statusLabel = (record: any) => {
    let status_text = "SOLVED";
    if (record === undefined) {
      status_text = "UNSOLVED";
    }
    if (record?.status === "REJ") {
      status_text = "REJECTED";
    }
    if (record?.status === "UNE") {
      status_text = "SOLVING";
    }
    return status_text;
  };

  let getStubTime = currentQuestion;

  const { default_execution_timelimit } = getStubTime;

  let keys: any;
  if (default_execution_timelimit) {
    keys = default_execution_timelimit[language];
  }

  let problemTypeName = (record: any) => {
    console.log(record, "record");

    let status_text = "Coding";
    if (record === "DBA") {
      status_text = "Database";
    }
    if (record === "MLI") {
      status_text = "Machine Learning/ AI";
    }
    if (record === "SEL") {
      status_text = "Selenium Testing";
    }
    if (record === "DSC") {
      status_text = "Data Science";
    }
    return status_text;
  };

  return (
    <>
      <div className={style.container}>
        <BreezeModal
          modalHead={false}
          modalData={data}
          visible={showReplaceModal}
          showContent={true}
          width={920}
          Content={
            <div className={appStyle.enable_fullscreen}>
              <div className={style.modalStyle}>
                <h3>{RELOAD_STUB}</h3>
                <p className={style.stub_content}>{RELOAD_STUB_CONTENT}</p>
              </div>
            </div>
          }
        />
        <section>
          <div>
            <QuestionTypeHeader
              lastSave={lastSave}
              changeTheme={changeEditorTheme}
              handleLanguage={handleLanguage}
              language={language}
              technologies={stubs}
              type={testName}
              theme={true}
              title={statusLabel(currentAnswer)}
            />
          </div>
        </section>
        <section>
          <div onClick={menuOpenQuestion}>
            <SidebarMenu />
          </div>
        </section>

        <div className={style.horizontal_wrapper}>
          <Split
            sizes={[40, 60]}
            minSize={[100, 700]}
            onDrag={(s: any) => {
              if (codeEditor) {
                const element = document.getElementById("code-container");

                codeEditor.resizeEditor({
                  height: editorRef.current.clientHeight,
                  width: element?.clientWidth || 340,
                });
              }
            }}
            gutter={(index, direction) => {
              const gutter = document.createElement("span");
              gutter.className = `gutter gutter-${direction}`;
              const resizeIcon = document.createElement("i");
              resizeIcon.className = "fa fa-ellipsis-v";
              gutter.appendChild(resizeIcon);
              return gutter;
            }}
            gutterAlign="center"
            snapOffset={30}
            dragInterval={1}
            direction="horizontal"
            cursor="col-resize"
            className={style.split_flex}
          >
            {!closeQuestion ? (
              <div className={style.column_1}>
                <div className={style.questionSection}>
                  <div className={style.description}>
                    <div>
                      <div className={style.QuestionType}>
                        <img src={listIcon} alt={"Icon"} />
                        <h2 className={style.prb_type}>
                          {problemTypeName(currentQuestion?.problem_type)}
                        </h2>
                      </div>
                      <h4 className={style.prb_name}>
                        {currentPage}. {currentQuestion.name}
                      </h4>
                      <h2 className={style.desc}>Description</h2>
                      <FormatText data={currentQuestion.description} />
                      <DataCodingFun
                        languageTimeLimit={keys}
                        onClick={toggleReportHandler}
                      />
                    </div>
                  </div>
                  <button onClick={handleClose}>
                    <img src={closeIcon} alt={"Img"} />
                  </button>
                </div>
              </div>
            ) : null}
            <div
              className={clsx({
                [style.column_2]: !closeQuestion,
                [style.fullScreen]: closeQuestion,
              })}
            >
              <div className={style.vertical_wrapper}>
                <Split
                  sizes={[75, 25]}
                  gutterAlign="center"
                  snapOffset={30}
                  dragInterval={1}
                  onDrag={(s: any) => {
                    console.log(s);

                    if (codeEditor) {
                      const element = document.getElementById("code-container");
                      console.log(element?.clientHeight);

                      codeEditor.resizeEditor({
                        height: s[0] * 4.55,
                        width: editorRef.current.clientWidth,
                      });
                    }
                  }}
                  direction="vertical"
                  cursor="row-resize"
                  gutter={(index, direction) => {
                    const gutter = document.createElement("span");
                    gutter.className = `gutter gutter-${direction}`;
                    const resizeIcon = document.createElement("i");
                    resizeIcon.className = "fa fa-ellipsis-h";
                    gutter.appendChild(resizeIcon);
                    return gutter;
                  }}
                  id="code-container"
                  className={style.split_vertical}
                >
                  <div
                    ref={editorRef}
                    className={style.editor}
                    id="code-editor"
                  />
                  {currentQuestion?.problem_type === "DBA" ? (
                    <CommonRunCode
                      clearHandler={clearHandler}
                      reportHandler={reportHandler}
                      solutionDetails={solutionDetails}
                      currentQuestion={currentQuestion}
                      currentPage={currentPage}
                      saveAnswer={saveAnswer}
                      currentAnswerExist={currentAnswerExist}
                      username={username}
                      currentAnswer={currentAnswer}
                      id={id}
                      slug={slug}
                      solutionSetId={solutionSetId}
                      statusBar={statusBar}
                      codeData={codeValue}
                      //  actionDisable={disableActions}
                      toggleReportHandler={toggleReportHandler}
                    />
                  ) : (
                    <NewRunCodeContainer
                      nextPage={nextPage}
                      clearHandler={clearHandler}
                      reportHandler={reportHandler}
                      solutionDetails={solutionDetails}
                      currentQuestion={currentQuestion}
                      currentPage={currentPage}
                      saveAnswer={saveAnswer}
                      currentAnswerExist={currentAnswerExist}
                      username={username}
                      currentAnswer={currentAnswer}
                      id={id}
                      slug={slug}
                      solutionSetId={solutionSetId}
                      statusBar={statusBar}
                      codeData={codeValue}
                      //  actionDisable={disableActions}
                      toggleReportHandler={toggleReportHandler}
                    />
                  )}
                </Split>
              </div>
            </div>
          </Split>
        </div>
      </div>
    </>
  );
};

export default React.memo(NewCoding);
