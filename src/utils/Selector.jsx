import React from "react";
import { MenuItem, Select } from "@material-ui/core";

import { selectorStyles } from "../styles";

export const Selector = (props) => {
  const { label, currentValue, handleChange, optionsArray } = props;
  return (
    <div style={selectorStyles.row}>
      <p style={selectorStyles.label}>{label}</p>
      <div style={selectorStyles.defaultContent}>
        <Select onChange={handleChange} value={currentValue}>
          {optionsArray.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </div>
    </div>
  );
};
