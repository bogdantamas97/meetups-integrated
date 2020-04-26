import React from "react";
import FooterBar from "../components/FooterBar.js";
import Content from "../components/Content";
import BaseHeader from "../components/BaseHeader";
import { withStyles } from "@material-ui/core";
import Cookies from "universal-cookie";

const styles = {
  mainLayout: {
    height: "100vh",
    display: "flex",
    flexDirection: "column"
  }
};

const MainLayout = (props) => {
    const classes = props.classes;
    return (
      <div className={classes.mainLayout}>
        <div style={{ height: "7%" }}>
          <BaseHeader userId={new Cookies().get("token") ? new Cookies().get("token").substring(6) : null}
            name={props.avatarInitials}
            inputText={props.topBarTitle}
          />
        </div>
        <div style={{ height: "83%" }}>
          <Content>{props.children}</Content>
        </div>
        <div style={{ height: "10%" }}>
          <FooterBar />
        </div>
      </div>
    );
  }

export default withStyles(styles)(MainLayout);
