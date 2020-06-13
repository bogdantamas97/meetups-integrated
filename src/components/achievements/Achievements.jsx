import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { withStyles } from "@material-ui/core";

import AchievementsItem from "./AchievementsItem";
import { MainLayout } from "../../layouts/index";
import { surpriseBox as AchievementsBoxImg} from "../../images/index";
import { DATA_BASE_URL, ACHIEVEMENTS_URL } from "../../constants/index";

const styles = {
  achievementsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  achievementsBox: {
    height: "20%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  achievementsBoxImg: {
    width: "60%",
    maxHeight: "100%",
  },
  achievementsListContainer: {
    height: "75%",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
};

const CURRENT_USER_ID = new Cookies().get("token");

const Achievements = (props) => {
  const { classes } = props;

  const [currentPoints, setCurrentPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(ACHIEVEMENTS_URL);
      setAchievements(result.data);
      getCurrentPoints();
    }
    fetchData();
  }, []);

  const getCurrentPoints = async () => {
    const result = await axios(DATA_BASE_URL);
    setCurrentPoints(
      result.data.find((item) => item.id === CURRENT_USER_ID).points
    );
  };

  return (
    <MainLayout topBarTitle={"Achievements"}>
      <div className={classes.achievementsContainer}>
        <div className={classes.achievementsBox}>
          <img
            className={classes.achievementsBoxImg}
            src={AchievementsBoxImg}
            alt={"box"}
          />
        </div>
        <div className={classes.achievementsListContainer}>
          {achievements.map((item) => {
            return (
              <AchievementsItem
                key={item.id}
                points={item.points}
                title={item.title}
                description={item.description}
                picturePath={item.picturePath}
                color={item.points < currentPoints ? "#90EE90" : "white"}
              />
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default withStyles(styles)(Achievements);
