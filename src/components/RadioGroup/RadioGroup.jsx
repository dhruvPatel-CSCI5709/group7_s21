/**
 * Author: Nikunj Shamjibhai Dhola
 * Description: Reusable component of Radio
 */
import { Radio } from "antd";
import React from "react";

const RadioGroup = ({ className, options, onChange, value }) => {
  return (
    <div className={className}>
      <Radio.Group
        options={options}
        onChange={onChange}
        value={value}
        optionType="button"
        buttonStyle="solid"
      />
    </div>
  );
};

export default RadioGroup;
