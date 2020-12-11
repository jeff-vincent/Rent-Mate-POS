import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import Signup from "../components/Signup";
import {
  connectGoogleOAuth,
  connectFacebookAuth,
} from "../../../actions/authActions";

const SignupContainer = ({
  // signup,
  isAuthenticated,
  connectGoogleOAuth,
  connectFacebookAuth,
}) => {
  const history = useHistory();
   
  return (
    <Signup
      handleGoogleSignup={connectGoogleOAuth}
      handleFbSignup={connectFacebookAuth}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
};

export default connect(mapStateToProps, {
  // signup,
  connectFacebookAuth,
  connectGoogleOAuth,
})(SignupContainer);
