import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { withStyles } from "@material-ui/core";

import { FooterBar, Content, BaseHeader } from "../components";
import { DATA_BASE_URL } from "../constants";
import { mainLayoutStyles } from "../styles";

const MainLayout = (props) => {
  const { classes, avatarInitials, topBarTitle, children } = props;

  const [fullName, setFullName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const result = await axios(DATA_BASE_URL);
      const CURRENT_USER_ID = new Cookies().get("token");

      const currentUser = await result.data.filter(
        (element) => element.id === CURRENT_USER_ID
      )[0];

      if (currentUser) {
        setFullName(currentUser.firstname + " " + currentUser.lastname);
      }
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

export default withStyles(mainLayoutStyles)(MainLayout);
