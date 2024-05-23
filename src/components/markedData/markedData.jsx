import React from "react";
import { marked } from "marked";
import { Typography } from "antd";

const FormatData = ({ formatData, className }) => {
  return (
    <Typography className={className}>
      <span dangerouslySetInnerHTML={{ __html: marked(formatData) }}></span>
    </Typography>
  );
};
export default React.memo(FormatData);
