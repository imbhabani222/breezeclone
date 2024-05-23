import exclamationCircle from "../../assets/exclamation_circle.svg";
import clearSvg from "../../assets/clear.svg";
import listIcon from "../../assets/list_item.svg";
import styles from "./coding.module.scss";
import { Button } from "antd";
import clsx from "clsx";

export const DataCodingFun = ({
  onOk,
  onCancel,
  onClick,
  languageTimeLimit,
}: any) => {
  // console.log(onClick, "clickedddddddddddddd");

  // console.log(onCancel, "onccccccccccccc");

  return (
    <div>
      <div className={styles.Execution}>
        <div className={styles.timelimit}>
          <p>
            EXECUTION TIME LIMIT
            <span> :{" " + languageTimeLimit?.timelimit} Seconds</span>
          </p>
        </div>
        <Button
          data-testid={`button-up-${"REPORT AN ISSUE"}`}
          // type={type}
          className={clsx(styles.btn, styles.rectFilledBtn)}
          onClick={onClick}
        >
          {true ? <img alt={"beforeIcon"} src={exclamationCircle} /> : null}
          REPORT AN ISSUE
        </Button>
      </div>
    </div>
  );
};
