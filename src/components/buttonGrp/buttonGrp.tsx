import React, { useState } from "react";
import clsx from "clsx";
import { Button } from "antd";

import styles from "./buttonGrp.module.scss";

export interface ButtonProps {
  className?: string;
  display?: string;
  type?: any;
  onClick?: any;
  beforeIcon?: string;
  afterIcon?: string;
  disabled?: boolean;
}
export interface ButtonArrayProps {
  buttons?: ButtonProps[];
  className?: any;
}
const ButtonGrp: React.FC<ButtonArrayProps> = ({ buttons, className }) => {
  const [value, setValue] = useState<string>("");
  const [inputval, setInputVal] = useState<string>("");

  return (
    <div className={clsx(styles.btnGrp, className)}>
      {buttons?.map(
        ({
          display,
          type,
          className,
          onClick,
          beforeIcon,
          afterIcon,
          disabled,
        }) => (
          <Button
            data-testid={`button-up-${display}`}
            type={type}
            className={clsx(
              styles.btn,
              {
                [styles.outlineBtn]: type === "outline",
                [styles.filledBtn]: type === "filled",
                [styles.rectOutlineBtn]: type === "rectOutline",
                [styles.rectFilledBtn]: type === "rectFilled",
                [styles.rectRedBtn]: type === "rectred",
              },
              className
            )}
            onClick={onClick}
            disabled={disabled}
          >
            {beforeIcon ? <img alt={beforeIcon} src={beforeIcon} /> : null}
            {display}
            {afterIcon ? <img alt={afterIcon} src={afterIcon} /> : null}
          </Button>
        )
      )}
    </div>
  );
};
export default React.memo(ButtonGrp);
