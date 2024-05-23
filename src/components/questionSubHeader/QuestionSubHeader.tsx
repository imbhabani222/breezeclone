import React from "react";
import { Typography } from "antd";

import ButtonGrp from "../buttonGrp/buttonGrp";

import style from "./questionSubHeader.module.scss";

export interface SubHeaderData {
  typeOfQuestions?: string;
  Icon?: string;
  hideIcon?: Boolean;
  title?: string;
  text?: string;
  buttons?: {
    className?: any;
    type?: string;
    display: string;
    disabled?: any;
    onClick: any;
    beforeIcon?: string;
    afterIcon?: string;
  }[];
}

const { Paragraph } = Typography;

const QuestionSubHeader: React.FC<{ titles: SubHeaderData }> = ({ titles }) => {
  const { typeOfQuestions, Icon, buttons, text, title, hideIcon } = titles;
  return (
    <>
      {buttons && (
        <div className={style.question_type}>
          <div className={style.image}>
            {hideIcon ? "" : <img src={Icon} alt={typeOfQuestions || ""} />}
            <h3>{typeOfQuestions || ""}</h3>
          </div>
          <div>
            <ButtonGrp className={style.header_btn_div} buttons={buttons} />
          </div>
        </div>
      )}
      <div>
        <div className={style.header_content}>
          <Paragraph className={style.content_title}>{title}</Paragraph>
          {text ? <p className={style.content_text}>{text}</p> : null}
        </div>
      </div>
    </>
  );
};

export default QuestionSubHeader;
