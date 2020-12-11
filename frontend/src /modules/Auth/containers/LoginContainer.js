import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
// 
import Login from "../components/Login";
import {
  login,
  connectGoogleOAuth,
  connectFacebookAuth,
} from "../../../actions/authActions";

const LoginModalContainer = ({
  login,
  isAuthenticated,
  connectGoogleOAuth,
  connectFacebookAuth,
}) => {
  const history = useHistory();

  React.useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [isAuthenticated]);

  return (
    <Login
      handleGoogleLogin={connectGoogleOAuth}
      handleFbLogin={connectFacebookAuth}
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  login,
  connectFacebookAuth,
  connectGoogleOAuth,
})(LoginModalContainer);
