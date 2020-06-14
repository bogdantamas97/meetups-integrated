import React from "react";
import { withStyles } from "@material-ui/core";

import { contentStyles } from "../../styles";

const Content = (props) => {
  const { classes, children } = props;
  const { content } = classes;
  return <div className={content}>{children}</div>;
};

export default withStyles(contentStyles)(Content);
