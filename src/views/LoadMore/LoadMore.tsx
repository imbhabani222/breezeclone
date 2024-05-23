import React from "react";
import { Button } from "antd";
import ButtonGroup from "antd/lib/button/button-group";

import messages from "../../constants/messages";

const { LOAD_MORE } = messages;

interface LoadMoreProps {
  onClick: any;
}

const LoadMore: React.FC<LoadMoreProps> = ({ onClick }) => {
  return (
    <div className="loadBtn">
      <Button onClick={onClick}>{LOAD_MORE}</Button>
    </div>
  );
};

export default React.memo(LoadMore);
