import FormatText from "../../components/katexToHtml/formatText";
import QuestionSubHeader from "../../components/questionSubHeader/QuestionSubHeader";
import { dataMcqFun, FooterButtons } from "./dataMcq";
import messages from "../../constants/messages";
import style from "./mcq.module.scss";
import styles from "./newMcq.module.scss";
import clsx from "clsx";
import { Checkbox, Radio, Space } from "antd";
import { useEffect, useState } from "react";
import ButtonGrp from "../../components/buttonGrp/buttonGrp";
const { DESCRIPTION_LABEL } = messages;
const NewMCQ = ({
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
  solutionSetId,
  actionDisable,
  toggleReportHandler,
}: any) => {
  console.log(solutionSetId, "solutionSetIdsolutionSetId");

  const [answer, setAnswer] = useState<any>(null);
  const [actionsDisable, setActionsDisable] = useState<boolean>(false);
  const [answerExist, setCurrentAnswerExist] =
    useState<any>(currentAnswerExist);

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

  const subHeaderHandler = () => {
    const data = dataMcqFun({
      onOk: toggleReportHandler,
      onCancel: clearHandler,
      disabled: solutionDetails === 404 || actionsDisable,
    });
    return <QuestionSubHeader titles={data} />;
  };

  const storeAnswer = (a?: any) => {
    let ans: any = a ? (typeof a === "object" ? a : [a]) : answer;
    setAnswer(ans);
    if (!answerExist) {
      const payload = {
        choice: ans,
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
        choice: ans,
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
  const callPostMCQ = () => {
    const data = FooterButtons({
      onSubmit: () => {
        storeAnswer(answer);
      },
      disabled: !answer || actionsDisable,
    });
    return <ButtonGrp className={style.footer_btn_div} buttons={data} />;
  };

  console.log(currentPage, "currentPage");

  return (
    <>
      <div className={style.container}>
        <div className={style.mcq_container}>{subHeaderHandler()}</div>
        {currentQuestion && (
          <>
            <div className={styles.questionContainer}>
              <h2>
                {currentPage}. {currentQuestion.name}
              </h2>
              <h3>{DESCRIPTION_LABEL}</h3>
              <FormatText data={currentQuestion.description} question />
            </div>
            <div>
              <p className={style.selectLabel}>Please select your Answer.</p>
              <div className={style.mcq_option}>
                <div
                  className={clsx({
                    [style.option_content]: true,
                  })}
                >
                  {currentQuestion.is_multi_correct ? (
                    <Checkbox.Group
                      onChange={(e) => {
                        storeAnswer(e);
                      }}
                      value={answer ? answer : undefined}
                    >
                      <Space direction="vertical">
                        {currentQuestion.mcq_options?.map(
                          (item: any, idx: any) => (
                            <Checkbox
                              key={idx}
                              value={+item.id}
                              className={style.sampleClass}
                              disabled={actionsDisable}
                            >
                              <FormatText data={item.content} />
                            </Checkbox>
                          )
                        )}
                      </Space>
                    </Checkbox.Group>
                  ) : (
                    <Radio.Group
                      onChange={(e) => {
                        storeAnswer(e.target.value);
                      }}
                      value={answer ? answer[0] : undefined}
                    >
                      <Space direction="vertical">
                        {currentQuestion?.mcq_options?.map(
                          (item: any, idx: any) => (
                            <Radio
                              key={idx}
                              value={item.id}
                              className={style.sampleClass}
                              disabled={actionsDisable}
                            >
                              <FormatText data={item.content} />
                            </Radio>
                          )
                        )}
                      </Space>
                    </Radio.Group>
                  )}
                </div>
                {callPostMCQ()}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NewMCQ;
