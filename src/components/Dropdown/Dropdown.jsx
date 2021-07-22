/**
 * Author: Nikunj Shamjibhai Dhola
 * Description: Reusable component of Dropdown menu
 * @param {*} value
 * @param {*} options
 * @param {*} onChange
 * @param {*} placeholder
 */
import React from "react";
import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import c from "classnames/bind";
import styles from "./Dropdown.module.css";

const cx = c.bind(styles);

const Dropdown = ({ value, options, onChange, placeholder }) => {
  return (
    <div className={cx("dropdown")}>
      <Select value={value} placeholder={placeholder} onChange={onChange}>
        {options.map((option, index) => {
          return (
            <Option kye={index} value={option.value}>
              {option.label}
            </Option>
          );
        })}
      </Select>
    </div>
  );
};

export default Dropdown;
