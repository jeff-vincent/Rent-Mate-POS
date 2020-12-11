import React from "react";
import { Box } from "@material-ui/core";

import LoginContainer from "../containers/LoginContainer";

const LoginPage = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Box maxWidth="500px" marginTop={5}>
        <LoginContainer />
      </Box>
    </Box>
  );
};

export default LoginPage;
