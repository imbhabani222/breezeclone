import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";

import "react-quill/dist/quill.snow.css";
import style from "./database.module.scss";
import NewRunCode from "../coding/newRunCode";
import QuestionTypeHeader from "../../components/QuestionTypeHeader/QuestionTypeHeader";
import SidebarMenu from "../../components/sidebarMenu/sidebarMenu";

const NewDatabase = ({
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
  solutionSetId,
  actionDisable,
  toggleReportHandler,
  testName,
}: any) => {
  const [closeQuestion, setCloseQuestion] = useState(false);

  const menuOpenQuestion = () => {
    setCloseQuestion(!closeQuestion);
  };

  return (
    <>
      <div>
        <section>
          <div onClick={menuOpenQuestion}>
            <SidebarMenu />
          </div>
        </section>
      </div>
    </>
  );
};

export default React.memo(NewDatabase);
