import React from "react";
import { Typography, Image } from "antd";

import Icon from "@ant-design/icons";
import styles from "../dataBar.module.scss";
import constants from "../../../constants/constants";
import ProgressBarWrapper from "../progressBarWrapper/progressBarWrapper";
import clsx from "clsx";

const { Text } = Typography;
const { PROGRESSBAR_KEY } = constants;
interface doublelineProps {
  title: string;
  subTitle: string;
}

export interface databarProps {
  title: string;
  subTitle: string;
  image?: any;
  alt?: string;
  values?: doublelineProps[];
  type?: string;
  className?: string;
}

const DataBarWrapper: React.FC<databarProps> = ({
  title,
  subTitle,
  image,
  className,
  alt,
  values,
  type,
}) => {
  const loadTitle = (title: string) => {
    return (
      <Text
        className={styles.databar_title}
        title={title}
        ellipsis={{ tooltip: title }}
      >
        {title}
      </Text>
    );
  };
  const content = (title: string, subTitle: string, id: any) => {
    return (
      <div key={id + "d"} className={styles.databar_wrapper}>
        {loadTitle(title)}
        <div className={styles.databar_subtitle}>{subTitle}</div>
      </div>
    );
  };
  return (
    <div className={clsx(styles.databar_wrapper_container, className)}>
      {type === PROGRESSBAR_KEY ? (
        <ProgressBarWrapper data-testid="databardiv" />
      ) : (
        <>
          {/* <Image className={styles.responsive_img} src={image} alt={alt} preview={false} /> */}
          {typeof image === "string" ? (
            <Image
              data-testid="imagediv"
              className={clsx(styles.responsive_img, className)}
              src={image}
              alt={alt}
              preview={false}
            />
          ) : (
            <Icon component={image} />
          )}

          {values && (
            <div className={styles.calendar_double_line}>
              {values.map((ele, id) => content(ele.title, ele.subTitle, id))}
            </div>
          )}
          {!values && content(title, subTitle, title + 1)}
        </>
      )}
    </div>
  );
};
export default DataBarWrapper;
