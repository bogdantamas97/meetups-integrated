import React from "react";
import { MenuItem, Select } from "@material-ui/core";

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0px",
  },
  defaultContent: {
    width: "40%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  label: {
    fontFamily: "Georgia",
    width: "80%",
    display: "flex",
    flexDirection: "row",
  },
};

export const Selector = (props) => {
  const { label, currentValue, handleChange, optionsArray } = props;
  return (
    <div style={styles.row}>
      <p style={styles.label}>{label}</p>
      <div style={styles.defaultContent}>
        <Select onChange={handleChange} value={currentValue}>
          {optionsArray.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
          >
        </Select>
      </div>
    </div>
  );
};
