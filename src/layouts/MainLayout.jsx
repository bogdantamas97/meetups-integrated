import React, { useState, useEffect } from "react";
import FooterBar from "../components/FooterBar.jsx";
import Content from "../components/Content";
import BaseHeader from "../components/BaseHeader";
import { withStyles } from "@material-ui/core";
import Cookies from "js-cookie";
import axios from "axios";

const apiBaseUrl = "http://localhost:8000";

const styles = {
  mainLayout: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
};

const MainLayout = (props) => {
  const { classes, avatarInitials, topBarTitle, children } = props;
  const [ fullName, setFullName ] = useState("");

  useEffect(() => {
    async function fetchData() {
      axios
        .get(apiBaseUrl)
        .then((result) =>
          setFullName(
            result.data.filter(
              (element) => element.id === Cookies.get("token")
            )[0].firstname +
              " " +
              result.data.filter(
                (element) => element.id === Cookies.get("token")
              )[0].lastname
          )
        )
        .catch(() => {
          console.log("error");
        });
    }
    fetchData();
  }, []);

  return (
    <div className={classes.mainLayout}>
      <div style={{ height: "10%" }}>
        <BaseHeader
          fullName={fullName}
          name={avatarInitials}
          inputText={topBarTitle}
        />
      </div>
      <div style={{ height: "80%" }}>
        <Content>{children}</Content>
      </div>
      <div style={{ height: "10%" }}>
        <FooterBar />
      </div>
    </div>
  );
};

export default withStyles(styles)(MainLayout);
