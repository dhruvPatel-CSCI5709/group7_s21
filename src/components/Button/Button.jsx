import React from "react";
import { Button } from "antd";
import styles from "./Button.module.css";
import c from "classnames/bind";

const cx = c.bind(styles);

const StyledButton = ({ disabled, icon, buttonTitle, handleClick, style }) => {
  return (
    <Button className={cx("app-button")} style={{...style}} onClick={handleClick} disabled={disabled} icon={icon}>
        {buttonTitle}
    </Button>
  );
};

export default StyledButton;
