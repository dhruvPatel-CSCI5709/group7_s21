import React from "react";
import { Button } from "antd";
import styles from "./Button.module.css";
import c from "classnames/bind";

const cx = c.bind(styles);

const StyledButton = ({ disabled, icon }) => {
  return (
    <Button className={cx("app-button")} disabled={disabled} icon={icon}>
      Print To PDF
    </Button>
  );
};

export default StyledButton;
