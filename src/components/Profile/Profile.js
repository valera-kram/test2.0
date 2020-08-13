import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/styles";
import styles from "./Profile.styles";

import { sessionService } from "redux-react-session";
import { connect } from "react-redux";

import { getProfile, clearLocalProfile } from "../../actions/profileAction";
import { deleteSession } from "../../actions/sessionsActions";
import { setError } from "../../actions/errorsAction";
import history from "../../history";

import AppHeader from "../AppHeader/AppHeader";

class UserProfile extends React.Component {
  componentDidMount = () => {
    sessionService
      .loadSession()
      .then((current_session) => {
        if (current_session.token)
          this.props.getProfile(current_session.token).catch((error) => {
            this.props.setError(error).then(() => {
              if (this.props.error.type === "access_token_invalid") {
                sessionService.deleteSession().then(() => {
                  this.props.deleteSession().then(() => {
                    this.props.clearLocalProfile().then(() => {
                      history.push("/signin");
                    });
                  });
                });
              }
            });
          });
      })
      .catch((err) => {
        history.push("/signin");
      });
  };

  renderUserProfile = () => {
    const { user } = this.props.profile;
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5">First name: {user.first_name}</Typography>
          <hr />
          <Typography variant="h5">Last name: {user.last_name}</Typography>
          <hr />
          <Typography variant="h5">Phone: {user.phone}</Typography>
        </CardContent>
      </Card>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <AppHeader />
        <Box pl={5} pr={10} pt={4} pb={5}>
          <Typography variant="h3" className={classes.header}>
            Your profile!
          </Typography>
          {this.props.profile.user.id && this.renderUserProfile()}
        </Box>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  getProfile,
  clearLocalProfile,
  deleteSession,
  setError,
})(withStyles(styles)(UserProfile));
