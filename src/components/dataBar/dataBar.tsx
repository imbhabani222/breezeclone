import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { useNavigate, useLocation } from "react-router-dom";

import { Button, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";

import DataBarWrapper from "./dataBarWrapper/dataBarWrapper";
import styles from "../dataBar/dataBar.module.scss";
import useFetch from "../../data/dataBar-async";
import constants from "../../constants/constants";

const {
  ROUTE: {
    LANDING_PAGE,
    INSTRUCTION_PAGE,
    FEEDBACK,
    DOSELECT_INSTRUCTION,
    FAQ,
    TESTCOMPLETE,
    SWITCH_PATH,
    TEST_SECTION_SUBMIT,
    FIll_IN_BLANKS,
  },
} = constants;
const { Text } = Typography;
export interface doublelineProps {
  title: string;
  subTitle: string;
}
export interface dataProps {
  title?: string | any;
  subTitle?: string;
  image?: any;
  alt?: string;
  values?: doublelineProps[];
  type?: any;
  className?: string;
  total?: number;
  completed?: number;
}
export interface dataArray {
  id: number;
  alignLeft?: boolean;
  title?: string;
  actionButton?: string;
  data?: dataProps[];
}
const DataBar = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[4];
  const getDatabarData = useFetch();
  const slug = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [ids, setIds] = useState<number[]>([]);
  useEffect(() => {
    switch (location.pathname.toLocaleLowerCase()) {
      case LANDING_PAGE.toLocaleLowerCase():
        setIds([1, 3]);
        break;
      case INSTRUCTION_PAGE.toLocaleLowerCase().replace(":slug", slug):
        setIds([1, 3, 6]);
        break;
      case DOSELECT_INSTRUCTION.toLocaleLowerCase().replace(":slug", slug):
        setIds([1, 3]);
        break;
      case FEEDBACK.toLocaleLowerCase().replace(":slug", slug):
        setIds([1]);
        break;
      case FAQ.toLocaleLowerCase().replace(":slug", slug):
        setIds([4, 5]);
        break;
      case TESTCOMPLETE.toLocaleLowerCase().replace(":slug", slug):
        setIds([1]);
        break;
      case TEST_SECTION_SUBMIT.toLocaleLowerCase().replace(":slug", slug):
        setIds([2]);
        break;
      case SWITCH_PATH.toLocaleLowerCase()
        .replace(":slug", slug)
        .replace(":id", id):
        setIds([0]);
        break;
      default:
        setIds([2, 3, 4, 5]);
    }
  }, [id, location, slug]);
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const getBar = (layout: dataArray) => {
    return (
      <>
        {layout?.data?.map(
          ({ values, title, subTitle, image, alt, type, className }, id) => (
            <DataBarWrapper
              title={title}
              subTitle={subTitle || ""}
              image={image}
              alt={alt}
              values={values}
              type={type}
              key={id + "w"}
              className={className}
            />
          )
        )}
      </>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.container_content}>
        {getDatabarData
          ?.filter(({ id }) => (ids ? ids.includes(id) : true))
          .map((layout, id) => (
            <div
              key={id + "l"}
              className={clsx(styles.layout, {
                [styles.backGroundTypeTwo]: layout.title,
              })}
            >
              {layout.actionButton && (
                <Button
                  className={styles.databar_btn}
                  shape="round"
                  icon={<LeftOutlined />}
                  onClick={goBack}
                >
                  {layout.actionButton}
                </Button>
              )}
              {layout.alignLeft ? (
                <div className={styles.typeTwo}>
                  <div className={styles.containerTwo}>
                    {layout.title && (
                      <Text className={styles.support_text}>
                        {layout.title}
                      </Text>
                    )}
                    <div className={styles.content}>{getBar(layout)}</div>
                  </div>
                </div>
              ) : (
                getBar(layout)
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default React.memo(DataBar);
