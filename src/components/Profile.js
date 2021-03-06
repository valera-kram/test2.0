import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@material-ui/core";
import { sessionService } from "redux-react-session";
import { connect } from "react-redux";

import { getProfile, clearLocalProfile } from "../actions/profileAction";
import { deleteSession } from "../actions/sessionsActions";
import { setError } from "../actions/errorsAction";
import history from "../history";

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
                    history.push("/signin");
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

    return (
      <Card style={{ maxWidth: 300 }}>
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

  onSignOut = () => {
    this.props.deleteSession().then(() => {
      this.props.clearLocalProfile().then(() => history.push("/signin"));
    });
  };

  render() {
    return (
      <Box>
        <h1>Your profile!</h1>
        {this.props.profile.user.id && this.renderUserProfile()}
        <Box pl={10} pr={10} pt={4} pb={5}>
          <Button variant="contained" color="primary" onClick={this.onSignOut}>
            Sign Out
          </Button>
        </Box>
      </Box>
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
})(UserProfile);
