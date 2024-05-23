import { useEffect, useState } from "react";
import QuestionSubHeader from "../../components/questionSubHeader/QuestionSubHeader";
import { dataFillInBlanksFun, FooterButtons } from "./data";
import style from "./fillintheBlanks.module.scss";
import { Typography } from "antd";
import purifyInnerHtml from "../../utils/innerHTML";
import { onSubmitFun, stringFillerInput } from "../../data/utils";
import _ from "lodash";
import ButtonGrp from "../../components/buttonGrp/buttonGrp";
import messages from "../../constants/messages";
import { useNavigate, useParams } from "react-router-dom";
import { getQuestionsSelector } from "../../selectors/questionsSelector";
import { useDispatch, useSelector } from "react-redux";

const { Paragraph } = Typography;
const { PLEASE_TYPE_ANSWER } = messages;

const NewFIB = ({
  reportHandler,
  solutionDetails,
  currentQuestion,
  currentPage,
  currentAnswer,
  saveAnswer,
  clearHandler,
  currentAnswerExist,
  username,
  id,
  slug,
  nextPage,

  solutionSetId,
  actionDisable,
  toggleReportHandler,
}: any) => {
  const [answer, setAnswer] = useState<any>(null);
  const [input_val, setInputOnchangeVal] = useState(null);
  const [actionsDisable, setActionsDisable] = useState<boolean>(false);

  const [answerExist, setCurrentAnswerExist] =
    useState<any>(currentAnswerExist);

  const getByClassName: any = document.getElementsByClassName("inputString");
  const getArray: any = [...getByClassName].map((data) => data.value.trim());
  let choiceArray: any;

  useEffect(() => {
    if (currentAnswer) {
      setAnswer(currentAnswer.choice);
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
  useEffect(() => {
    let i: any;
    if (answerExist) {
      for (i in currentAnswer?.choice) {
        document
          .getElementsByClassName("inputString")
          [i]?.setAttribute("value", currentAnswer?.choice[i]);
      }
    } else {
      for (i in getArray) {
        document
          .getElementsByClassName("inputString")
          [i]?.setAttribute("value", "");
      }
    }
  }, [answerExist, currentAnswer?.choice, getArray]);

  const storeAnswer = () => {
    const getArray: any = [...getByClassName].map((data) => data.value.trim());
    if (getArray === undefined) {
      setAnswer(getArray);
      choiceArray = getArray;
    } else {
      choiceArray = new Array(getArray);
      setAnswer(getArray);
    }
    if (!answerExist) {
      const payload = {
        choice: getArray,
        solution_type: "MCQ",
        creator: `/api/v1/user/${username}`,
        problem: `/api/v1/problem/${id}`,
        test: `/api/v1/test/${slug}`,
        test_solution_set: `api/v1/testsolutionset/${solutionSetId}`,
      };
      saveAnswer(payload);
    } else {
      const payload = {
        code: "",
        choice: _.flatten(choiceArray),
        answer: "",
        technology: null,
        attachments: [],
        learn_feed_item: null,
        video_url: "",
        extra_data: {},
        file_based_data: null,
      };
      saveAnswer(payload);
    }
  };

  const testSubmit = () => {
    storeAnswer();
  };

  const subHeaderHandler = () => {
    const data = dataFillInBlanksFun({
      onOk: toggleReportHandler,
      onCancel: () => clearHandler("FIB", "inputString"),
      disabled: solutionDetails === 404 || actionsDisable,
    });
    return <QuestionSubHeader titles={data} />;
  };

  const callPostFib = () => {
    const data = FooterButtons({
      onClick: storeAnswer,
      onSubmit: nextPage,
      disabledsubmit: !answer || actionsDisable,
    });

    return <ButtonGrp className={style.footer_btn_div} buttons={data} />;
  };
  const BLANK = `<input class="inputString" placeholder="Please type your answer"  value=""/>`;
  useEffect(() => {
    const getArray: any = [...getByClassName].map((data) => data.value.trim());
    console.log(getArray);
  }, [getByClassName]);

  console.log(input_val);
  return (
    <>
      <div className={style.container}>
        {subHeaderHandler()}
        <div className={style.desc_type_name}>
          <h2>
            {currentPage}. {currentQuestion?.name}
          </h2>
          <p>{PLEASE_TYPE_ANSWER}</p>
        </div>

        <div className={style.question_container}>
          <Paragraph className={style.question}>
            <>
              <div>
                {purifyInnerHtml(
                  stringFillerInput(`${currentQuestion?.description}`, {
                    BLANK,
                  })
                )}
              </div>
            </>
          </Paragraph>
          {callPostFib()}
        </div>
      </div>
    </>
  );
};

export default NewFIB;
