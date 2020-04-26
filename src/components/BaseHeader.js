import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Toolbar } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import TemporaryDrawer from "./TemporaryDrawer";
import { theme } from "../GlobalTheme/globalTheme";
import { Link } from "react-router-dom";
import axios from "axios";

const styles = () => ({
    appBarStyle: {
        position: "fix",
        backgroundColor: theme.palette.primary.dark
    },
    topBar: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
});

class BaseHeader extends Component {
    constructor(){
        super();
        this.state = {userFullName:''};
    }

    componentDidMount() {
        if(this.props.userId) {
            axios
                .get(`http://localhost:3001/users/${this.props.userId}`)
                .then(result => {
                    const userFullName = result.data.fullName;
                    this.setState({userFullName});
                })
                .catch((err) => {
                    alert('Could not connect to database!')
                });
        }
    }

    getInitials = fullName => {
        let initials = fullName.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return initials;
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.topBar}>
                <AppBar className={classes.appBarStyle}>
                    <Toolbar>
                        <TemporaryDrawer />
                        <Typography variant="h6" color="inherit" className={classes.topBar}>
                            {this.props.inputText}
                        </Typography>
                        <Link to="/profile" style={{textDecoration:'none'}}>
                            <Avatar>
                                <Typography variant="h6" color="inherit">
                                    {this.getInitials(this.state.userFullName)}
                                </Typography>
                            </Avatar>
                        </Link>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
BaseHeader.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BaseHeader);
