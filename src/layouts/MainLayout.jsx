import React, { useState } from "react";
import FooterBar from "../components/FooterBar.jsx";
import Content from "../components/Content";
import BaseHeader from "../components/BaseHeader";
import { withStyles } from "@material-ui/core";
import Cookie from "js-cookie";
import axios from "axios";

const apiBaseUrl = "http://localhost:8000";

const styles = {
  mainLayout: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
};

const getInitData = async (currentUserId, setFullName) => {
  axios
    .get(apiBaseUrl)
    .then((result) =>
      setFullName(
        result.data.filter((element) => element.id === currentUserId)[0]
          .firstname +
          " " +
          result.data.filter((element) => element.id === currentUserId)[0]
            .lastname
      )
    )
    .catch(() => {
      console.log("error");
    });
};

const MainLayout = (props) => {
  const { classes } = props;
  const currentUserId = Cookie.get("token");
  const [fullName, setFullName] = useState("");

  getInitData(currentUserId, setFullName);

  return (
    <div className={classes.mainLayout}>
      <div style={{ height: "7%" }}>
        <BaseHeader
          userFullName={fullName}
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
};

export default withStyles(styles)(MainLayout);
