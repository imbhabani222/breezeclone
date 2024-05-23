import React, { useCallback } from "react";
import { Checkbox, Typography } from "antd";
import clsx from "clsx";
import { useDispatch } from "react-redux";

import styles from "./systemCheck.module.scss";

import instructionDetails from "../../../constants/instructionConstant";
import { checkAction } from "../../../actions/actions";

const { Text } = Typography;
const { CHECKBOX_TXT } = instructionDetails;

const DoSelectIdentityCheck = () => {
  const dispatch = useDispatch();

  const onChangeCheck = useCallback(
    (e) => {
      dispatch(checkAction({ checkStatus: e.target.checked }));
    },
    [dispatch]
  );
  return (
    <div className={styles.identity_check}>
      <div
        className={clsx(
          styles.testlanding_main_wrapper,
          styles.checkbox_identity,
          styles.checkbox_main_div,
          styles.declaration
        )}
      >
        <Checkbox
          onChange={onChangeCheck}
          className={styles.check_box_style}
        ></Checkbox>
        <Text className={styles.checkbox_text_identity}>{CHECKBOX_TXT}</Text>
      </div>
    </div>
  );
};

export default React.memo(DoSelectIdentityCheck);
