import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import PropTypes from "prop-types";
import { Progress, Typography } from "antd";
import styles from "../dataBar.module.scss";
import colorVars from "../../../commonStyles/color.module.scss";
import messages from "../../../constants/messages";
import { stringFiller } from "../../../data/utils";
import { getProblemSelector } from "../../../selectors/problemSelector";

const { Text } = Typography;
const { PROGRESS_DATABAR_TEXT } = messages;

// const getAllData = () => {
//   return stringFiller(PROGRESS_DATABAR_TEXT, { completed, total });
// };

const ProgressBarWrapper = () => {
  const problems = useSelector(getProblemSelector);

  console.log(problems, "Problems");
  let total: number = 0,
    completed: any = 0;

  if (problems?.length >= 0) {
    problems &&
      problems.forEach((sec: any) => {
        sec.problems.forEach((singleObj: any) => {
          total++;
          if (singleObj.solution !== null) {
            completed++;
          }
        });
      });
  }

  const getText = () => {
    return stringFiller(PROGRESS_DATABAR_TEXT, { completed, total });
  };

  const [percent, setPercent] = useState<number>((completed / total) * 100);

  useEffect(() => {
    setPercent((completed / total) * 100);
  }, [completed, total]);

  return (
    <div className={styles.progressbar_col}>
      <Progress
        percent={percent}
        strokeWidth={+styles.progress_stroke_width || 10}
        strokeColor={colorVars.progress_stroke_color}
        trailColor={colorVars.progress_unfilled_color}
        showInfo={false}
        className={styles.progress}
      />
      <Text className={styles.progressbar_text} title="databartitle">
        {getText()}
      </Text>
    </div>
  );
};

export default React.memo(ProgressBarWrapper);
