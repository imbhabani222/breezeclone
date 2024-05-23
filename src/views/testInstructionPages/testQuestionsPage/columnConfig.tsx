import clsx from "clsx";
import { Link } from "react-router-dom";

import styles from "./testQuestions.module.scss";

import crossIcon from "../../../assets/cross_white.svg";
import tick_white from "../../../assets/right-icon.svg";
import solve from "../../../assets/tick_gray_circle.svg";
import review from "../../../assets/review.svg";
import resume from "../../../assets/resume.svg";
import mobile_cross_circle from "../../../assets/mobile_cross_circle.svg";
import mobile_tick from "../../../assets/mobile_circle_tick.svg";

import instructionDetails from "../../../constants/instructionConstant";
import constants from "../../../constants/constants";

import pencil_edit from "../../../assets/pencilEdit.svg";

const {
  ROUTE: { SWITCH_PATH },
} = constants;

let slug = window.location.pathname.split("/")[2];

const {
  ALT_IMG,
  COL_KEY_1,
  COL_TITLE_2,
  COL_TITLE_3,
  STATUS,
  ACTIONS,
  SOLVE,
  REVIEW,
  UNSOLVED,
  SOLVED,
} = instructionDetails;

export const columnsData = [
  {
    title: COL_KEY_1,
    key: "id",
    className: styles.sl_no_col,
    render: (record: string, index: number, id: string) => {
      return <span>{id + 1}</span>;
    },
  },
  {
    title: COL_TITLE_2,
    key: "name",
    className: styles.name_hover,
    render: (record: any, index: number) => {
      return (
        <Link
          to={SWITCH_PATH.replace(":slug", slug).replace(":id", record.slug)}
        >
          <span className={styles.problem_name}>{record.name}</span>
        </Link>
      );
    },
  },
  {
    title: COL_TITLE_3,
    dataIndex: "problem_type",
    key: "problem_type",
    className: styles.hide_col,
  },
  {
    title: STATUS,
    key: "solution",
    className: styles.status_width,
    render: (record: any, id: number) => {
      let src = () => {
        let url = tick_white;
        if (record.solution === null) {
          url = crossIcon;
        }

        if (
          record?.solution?.status !== "UNE" &&
          record?.solution?.is_submitted &&
          record?.problem_type === "SCR"
        ) {
          url = pencil_edit;
        }
        return url;
      };
      let src_mobile = () => {
        let url = "";
        if (record.solution === null) {
          url = mobile_cross_circle;
        } else url = mobile_tick;
        return url;
      };
      let statusLabel = () => {
        let status_text = UNSOLVED;
        if (record.solution !== null) {
          status_text = SOLVED;
        }
        // if (
        //   record?.solution?.status !== "UNE" &&
        //   record?.solution?.is_submitted &&
        //   record?.problem_type === "SCR"
        // ) {
        //   status_text = "SOLVING";
        // }
        // if (record?.solution?.status === "REJ") {
        //   status_text = "REJECTED";
        // }
        // if (
        //   record?.solution?.status === "UNE" &&
        //   record?.solution?.is_submitted &&
        //   record?.problem_type === "SCR"
        // ) {
        //   status_text = "SOLVED";
        // }

        return status_text;
      };
      return (
        <>
          <img className={styles.res_img} alt={ALT_IMG} src={src_mobile()} />
          <div
            key={`${id}i`}
            className={clsx({
              [styles.status_btn_gray]: record.solution === null,
              [styles.status_btn_green]: record.solution !== null,
              // [styles.status_btn_red]: record?.solution?.status === "REJ",
              // [styles.status_btn_purple]:
              //   record?.solution?.status !== "UNE" &&
              //   record?.solution?.is_submitted &&
              //   record.problem_type === "SCR",
            })}
          >
            <img className={styles.status_icons} alt={ALT_IMG} src={src()} />
            <div className={styles.status_txt_class}>
              {/* {record.solution === null ? UNSOLVED : SOLVED} */}
              {statusLabel()}
            </div>
          </div>
        </>
      );
    },
  },
  {
    title: ACTIONS,
    className: styles.action_class,
    render: (record: any, id: number, index: number) => {
      let src = () => {
        let url = "";
        if (record.solution === null) {
          url = solve;
        }
        if (record.solution !== null) {
          url = review;
        }
        // if (record?.solution?.status === "UNE") {
        //   url = resume;
        // }
        switch (record.status) {
        }
        return url;
      };
      let status = () => {
        let status_text = SOLVE;
        if (record.solution === null) {
          status_text = SOLVE;
        }
        if (record.solution !== null) {
          status_text = REVIEW;
        }

        if (
          record?.solution?.status !== "UNE" &&
          record?.solution?.is_submitted &&
          record.problem_type === "SCR"
        ) {
          status_text = "RESUME";
        }
        return status_text;
      };

      return (
        <>
          <div key={`${id}o`} className={styles.action_flex}>
            <img className={styles.action_icon} alt={ALT_IMG} src={src()} />
            <Link
              to={SWITCH_PATH.replace(":slug", slug).replace(
                ":id",
                record.slug
              )}
            >
              <span className={styles.status_action_txt}>{status()}</span>
            </Link>
          </div>
        </>
      );
    },
  },
];
