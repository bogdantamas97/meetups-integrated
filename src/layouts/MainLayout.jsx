import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { withStyles } from "@material-ui/core";

import { FooterBar, Content, BaseHeader } from "../components/index";
import { DATA_BASE_URL } from "../constants/index";

const styles = {
  mainLayout: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
};

const MainLayout = (props) => {
  const { classes, avatarInitials, topBarTitle, children } = props;
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    async function fetchData() {
      axios
        .get(DATA_BASE_URL)
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
