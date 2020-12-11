import React from "react";
import { Box } from "@material-ui/core";

import Signup from "../components/Signup";
import SignupContainer from '../../../modules/Auth/containers/SignupContainer';

const SignupPage = () => {
  return (
    <Box display="flex" justifyContent="center" marginTop={5}>
      <SignupContainer />
    </Box>
  );
};

export default SignupPage;
