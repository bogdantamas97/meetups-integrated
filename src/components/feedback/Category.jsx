import React from "react";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

const Category = (props) => {
  const { category, handleChange, value } = props;
  return (
    <RadioGroup row value={value} onChange={handleChange}>
      <p
        style={{
          width: "47%",
          fontSize: "12px",
        }}
      >
        {category}
      </p>

      <FormControlLabel
        value={"1"}
        key={1}
        style={{ width: "5px", flexGrow: 1 }}
        control={<Radio color="primary" />}
      />
      <FormControlLabel
        value={"2"}
        key={2}
        style={{ width: "5px", flexGrow: 1 }}
        control={<Radio color="primary" />}
      />
      <FormControlLabel
        value={"3"}
        key={3}
        style={{ width: "5px", flexGrow: 1 }}
        control={<Radio color="primary" />}
      />
      <FormControlLabel
        value={"4"}
        key={4}
        style={{ width: "5px", flexGrow: 1 }}
        control={<Radio color="primary" />}
      />
      <FormControlLabel
        value={"5"}
        key={5}
        style={{ width: "5px", flexGrow: 1 }}
        control={<Radio color="primary" />}
      />
    </RadioGroup>
  );
};

export default Category;
