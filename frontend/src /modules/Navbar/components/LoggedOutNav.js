import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import NavButtonLink from "./NavButtonLink";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const LoggedOutNav = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root} display="flex" justifyContent="space-between">
      <Box>
        <NavButtonLink text="LOGO" link="/" />
      </Box>
      <Box display="flex">
        <NavButtonLink text="features" />
        <NavButtonLink text="Solutions" />
        <NavButtonLink text="Why AutoAd?" />
        <NavButtonLink text="Help Center" />
        <NavButtonLink text="Login" link="/login" />
      </Box>
    </Box>
  );
};

export default LoggedOutNav;
