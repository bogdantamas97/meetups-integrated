import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  CircularProgress,
  List,
  Typography,
  withStyles,
} from "@material-ui/core";

import Header from "./Header";
import { profileStyles } from "../../styles";
import { Pagination } from "../../utils";
import { MainLayout } from "../../layouts/index";
import { POINTS_RECEIVED_URL, CURRENT_USER_ID } from "../../constants/index";

const Profile = (props) => {
  const [width, updateWidth] = useState(0);
  const [points, setPoints] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [elementsToShow, setElementsToShow] = useState(5);

  const updateWidthFunction = () => {
    updateWidth(window.innerWidth);
  };

  useEffect(() => {
    updateWidthFunction();
    window.addEventListener("resize", updateWidthFunction);

    return () => {
      window.removeEventListener("resize", updateWidthFunction);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(POINTS_RECEIVED_URL);
      const hasPoints = result.data.filter(
        (item) => item.userId === CURRENT_USER_ID
      )[0];

      setLoaded(true);
      if (hasPoints) {
        setPoints(hasPoints.points);
      }
    }

    fetchData();
  }, []);

  const handleClickLoadMore = () => {
    const numberOfElements = elementsToShow + 5;
    setElementsToShow(numberOfElements);
  };

  const { classes } = props;

  return (
    <MainLayout topBarTitle="My Profile">
      <div className={classes.root}>
        <Header userId={CURRENT_USER_ID} />
        {isLoaded ? (
          <List className={classes.List}>{Pagination(points)}</List>
        ) : (
          <div>
            <CircularProgress
              style={{
                width: "120px",
                height: "120px",
                marginTop: "180px",
                marginLeft: (width - 180) / 2,
              }}
            />
            <h2
              style={{
                width: "120px",
                height: "120px",
                marginLeft: (width - 180) / 2,
              }}
            >
              LOADING...
            </h2>
          </div>
        )}
        {isLoaded && (
          <div className={classes.loadmore}>
            <Button className={classes.button}>
              <Typography
                className={classes.typography}
                onClick={handleClickLoadMore}
              >
                Load more
              </Typography>
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default withStyles(profileStyles)(Profile);
