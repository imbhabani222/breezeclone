import React, { useEffect, useState } from "react";
import { Button } from "antd";
import clsx from "clsx";
import hljs from "highlight.js";
import { useNavigate } from "react-router-dom";

import "highlight.js/styles/atom-one-dark.css";
import style from "./testpadsidebar.module.scss";

import leftArrow from "../../assets/Images/leftArrow.svg";
import rightArrow from "../../assets/Images/rightArrow.svg";

import messages from "../../constants/messages";
import constants from "../../constants/constants";
import { toNumber } from "lodash";
const {
  ROUTE: { SWITCH_PATH },
} = constants;

const { ICON } = messages;

interface PaginationProps {
  data?: Array<string>;
  pageLimit?: any;
  dataLimit?: any;
  title?: any;
  filterQuestions: any;
  singleProblem: any;
  callBack: any;
  solved: any;
  className?: any;
  currentPage?: number;
  nextPage?: any;
  prevPage?: any;
}

const TestPagination: React.FC<PaginationProps> = ({
  filterQuestions = [],
  singleProblem = {},
  solved,
  callBack,
  className,
  currentPage = 1,
  nextPage,
  prevPage,
}) => {
  let navigate = useNavigate();
  const [solvedQuestions, setSolved] = useState<string[]>(solved);
  let testSlug = window.location.pathname.split("/")[2];
  const changePage = (event: any, problemSlug: any, index: any) => {
    // setProblemSlug(problemSlug);
    // setMcqIndex(index);
    // navigate(
    //   SWITCH_PATH.replace(":slug", testSlug).replace(":id", problemSlug)
    // );
    // const pageNumber = Number(event.target.textContent);
    // setCurrentPage(pageNumber);
    callBack(problemSlug);
  };

  useEffect(() => {
    if (solved) {
      setSolved(solved);
    }
  }, [solved]);

  return (
    <div className={clsx(style.firstColumn, className)}>
      <div className={style.pagination}>
        <img
          onClick={prevPage}
          className={style.leftArrow}
          src={leftArrow}
          alt={ICON}
        />
        {filterQuestions !== ""
          ? filterQuestions.map((item: any, index: any) => (
              <Button
                key={index}
                onClick={(e) => changePage(e, item.slug, index)}
                className={clsx({
                  [style.paginationItem]: true,
                  [style.solved]: solvedQuestions.some(
                    (data) => data === item.id + ""
                  ),
                  [style.active]: singleProblem
                    ? singleProblem.slug === item.slug
                    : false,
                  [style.attempted]: singleProblem
                    ? singleProblem.slug !== item.slug
                    : false,
                })}
              >
                <span className={style.number}>{index + 1}</span>
              </Button>
            ))
          : ""}
        <img
          onClick={nextPage}
          className={style.rightArrow}
          src={rightArrow}
          alt={ICON}
        />
      </div>
      <div className={style.pageNaviActions}>
        <Button
          onClick={prevPage}
          className={style.pre_btn}
          disabled={currentPage === 1}
        >
          {"Previous Question"}
        </Button>
        <Button onClick={nextPage} className={style.next_btn}>
          {"Next Question"}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(TestPagination);
