import React from "react";
import { withStyles } from "@material-ui/core";

import { contentStyles } from "../../styles";

const Content = (props) => (
  <div className={props.classes.content}>{props.children}</div>
);

export default withStyles(contentStyles)(Content);
