import React, { useState, useEffect }  from "react";
import { withStyles } from "@material-ui/core";
import MainLayout from "../../layouts/MainLayout.jsx";
import AchievementsBoxImg from "../../images/surpriseBox.png";
import AchievementsItem from "./AchievementsItem";
import axios from 'axios';

const styles ={
    achievementsContainer:{
        display: 'flex',
        flexDirection: 'column'
    },
    achievementsBox: {
        height:'20%',
        display:'flex',
        justifyContent:'center',
        flexDirection:'column',
        alignItems: 'center'
    },
    achievementsBoxImg:{
        width:'60%',
        maxHeight:'100%'
    },
    achievementsListContainer: {
        height: '75%',
        padding:'10px',
        display:'flex',
        flexDirection:'column',
        justifyContent: 'space-evenly'
    }
};

const Achievements = props => {

    const { classes } = props;
    const [ achievements, setAchievements ] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const result = await axios(
            "http://localhost:3001/achievements"
          );
          setAchievements(result.data);
        }
        fetchData();
    }, []);

    return (
        <MainLayout topBarTitle={'Achievements'}>
            <div className={classes.achievementsContainer}>
                <div className={classes.achievementsBox}>
                    <img className={classes.achievementsBoxImg} src={AchievementsBoxImg} alt={'box'}/>
                </div>
                <div className={classes.achievementsListContainer}>
                    {achievements.map(item=>{
                        return (<AchievementsItem key={item.id} points={item.points} title={item.title} description={item.description} picturePath={item.picturePath} />)
                    })}
                </div>
            </div>
        </MainLayout>

    );
}

export default withStyles(styles)(Achievements);
