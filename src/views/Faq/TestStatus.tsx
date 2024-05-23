import React, { Fragment } from "react";
import Icon from "@ant-design/icons";
import PropTypes from "prop-types";

import { ReactComponent as ActivateIcon } from "../../assets/Images/Vector.svg";
import { ReactComponent as DeActivateIcon } from "../../assets/Images/redVector.svg";

import messages from "../../constants/messages";

const {
  TESTSTATUS: { ACTIVATEICON, DEACTIVATEICON, ICONSTATUS },
} = messages;

interface TestStatusProps {
  history?: object;
  status: boolean;
  name: string;
  id: string;
}

const TestStatus: React.FC<TestStatusProps> = ({ status, name }) => {
  return (
    <Fragment>
      {!status ? (
        <div className={ICONSTATUS}>
          <Icon component={DeActivateIcon} className={ACTIVATEICON} />
          {name}
        </div>
      ) : (
        <div className={ICONSTATUS}>
          <Icon component={ActivateIcon} className={DEACTIVATEICON} />
          {name}
        </div>
      )}
    </Fragment>
  );
};

export default React.memo(TestStatus);
