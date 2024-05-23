import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "react-quill/dist/quill.snow.css";
import style from "./coding.module.scss";

import appStyle from "../../App.module.scss";

import closeIcon from "../../assets/closeX.svg";

import "./coding.module.scss";
import BreezeModal from "../../components/modal/modal";

import Split from "react-split";

import {
  getAnswerPostDataSelector,
  getQuestionsSelector,
} from "../../selectors/questionsSelector";

import {
  getTest,
  getSingleSolState,
  getIdentity,
  getSingleChoiceSolState,
  fetchLanguageSelector,
} from "../../selectors/selectors";
import {
  getPendingQuestionsSelector,
  getSolutionSetSelector,
} from "../../selectors/problemSelector";

import { fetchSolutionSetRequest } from "../../actions/problemActions";

import FormatText from "../../components/katexToHtml/formatText";
import QuestionTypeHeader from "../../components/QuestionTypeHeader/QuestionTypeHeader";

import TestPagination from "../../components/testLayoutSidebar/testpadSidbar";

import SidebarMenu from "../../components/sidebarMenu/sidebarMenu";
import clsx from "clsx";

import messages from "../../constants/messages";
import { WebSocketContext } from "../../utils/socket";
import RunCodeContainer from "./runCodeContainer";
import _get from "lodash/get";
import stub_data from "../../utils/scr_default_stub.json";

import listIcon from "../../assets/list_item.svg";
import { getAllProblemTypes, getAllSolvedIds } from "../../data/utils";
import Report from "../../components/Report/Report";
import { dataSubjective } from "./codingdata";
import { DataCodingFun } from "./dataCoding";

/**
 * Some trouble with scope in the onSave() function that gets called from
 * the library, prevents it from reading data properly from react's state
 */
let editorHeight = (window.innerHeight * 90) / 100 - 53 - 12;

const {
  CODING: { CODING, RELOAD_STUB, RELOAD_STUB_CONTENT },
} = messages;

const Coding = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const ws: any = useContext(WebSocketContext);
  const editorRef = useRef<any>(null);

  const allQuestions = useSelector(getQuestionsSelector);
  const solutionSet = useSelector(getSolutionSetSelector);
  const solutionDetails = useSelector(getSingleChoiceSolState);
  const testDetails = useSelector(getTest);
  const getIdentityDetails: any = useSelector(getIdentity);
  const getAnswerPostData = useSelector(getAnswerPostDataSelector);
  const SingleSolutionData = useSelector(getSingleSolState);
  // const solution = useSelector(getSingleSolState);

  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState<any>("javascript");
  const [codeValue, setCodeValue] = useState();
  const [newLanguage, setnewLanguage] = useState("");
  const [showReplaceModal, setshowReplaceModal] = useState(false);
  const [codeEditor, setCodeEditor] = useState(null as any);
  const [closeQuestion, setCloseQuestion] = useState(false);
  const [statusBar, setStatusbar] = useState("");
  const [activeKey, setactiveKey] = useState("1");
  const [verticalSplit, setVerticalSplit] = useState([90, 10]);
  const [horizontalSplit, setHorizontalSplit] = useState([35, 65]);

  const { user_id, username } = getIdentityDetails;
  let lastSave;
  if (solutionDetails !== 404) {
    lastSave = getAnswerPostData?.modified;
  } else lastSave = "No data";

  let solvedIds: any = getAllSolvedIds(solutionSet);
  let allTypes: any = getAllProblemTypes(allQuestions);

  const singleproblemData =
    allQuestions && allQuestions?.filter((val: any) => val.slug === id);

  let getDefaultLanguages = singleproblemData && singleproblemData[0]?.stubs;
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

  const { TYPE_RECTFILLED, TYPE_OUTLINE } = messages;

  const data = {
    buttons: [
      {
        type: "rectOutline",
        display: "No Don't replace my code",
        onClick: () => {
          console.log("language");

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

  const findCurrentQuestionIndex =
    allQuestions && allQuestions?.findIndex((data: any) => data.slug === id);

  let getStubTime = singleproblemData && singleproblemData?.[0];

  const { default_execution_timelimit } = getStubTime;

  let keys: any;
  if (default_execution_timelimit) {
    keys = default_execution_timelimit[language];
  }

  // console.log(keys, "timeeeee");

  const splitRef = useRef<any>(null);

  const spiltCHnage = (e: any) => {
    console.log(e, "eee");
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
              type={allTypes}
              theme={true}
              title={statusLabel(SingleSolutionData)}
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
            ref={splitRef}
            onDrag={(s: any) => {
              spiltCHnage(s);
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
                    {singleproblemData &&
                      singleproblemData.map((val: any) => {
                        return (
                          <div>
                            <div className={style.QuestionType}>
                              <img src={listIcon} alt={"Icon"} />
                              <h2 className={style.prb_type}>{CODING}</h2>
                            </div>
                            <h4 className={style.prb_name}>
                              {findCurrentQuestionIndex >= 0
                                ? findCurrentQuestionIndex + 1
                                : null}
                              . {val.name}
                            </h4>
                            <h2 className={style.desc}>Description</h2>
                            <FormatText data={val.description} />
                            {/* <div className={style.timelimit}>
                              EXECUTION TIME LIMIT:{keys.timelimit} Seconds
                            </div>
                            <div>Report An Issue</div> */}
                            <DataCodingFun languageTimeLimit={keys} />
                          </div>
                        );
                      })}
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
                  <RunCodeContainer
                    codeData={codeValue}
                    statusBar={statusBar}
                    handleLanguage={handleLanguage}
                    fullScreen={closeQuestion}
                  />
                </Split>
              </div>
            </div>
          </Split>
        </div>
        <TestPagination
          filterQuestions={allQuestions}
          singleProblem={singleproblemData}
          solved={solvedIds}
          callBack={() => dispatch(fetchSolutionSetRequest(testDetails.id))}
        />
      </div>
    </>
  );
};

export default React.memo(Coding);
