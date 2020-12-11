import React from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { Box, Typography, Button } from "@material-ui/core";
import RoundedButton from "../../../sharedComponents/components/RoundedButton";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    maxHeight: "600px",
  },
  heroLeft: {
    padding: theme.spacing(6),
  },
  heroRight: {
    backgroundColor: theme.palette.primary.light,
  },
}));

const Hero = () => {
  const classes = useStyles();
  const history = useHistory();
  const onClick = () => {
    history.push("/signup/");
  }
  return (
    <Box display="flex" className={classes.root}>
      <Box
        width="50%"
        display="flex"
        flexDirection="column"
        justifyContent="space-around"
        className={classes.heroLeft}
      >
        <Box>
          <Typography variant="h1">Lorem ipsom dolor sit amet</Typography>
          <Box marginTop="2rem">
            <Typography>
              Sed placeret, ligula id iaculus laureet. Amet.
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center">
          <RoundedButton onClick={onClick} size="large">Sign up</RoundedButton>
        </Box>
        {/* </Box> */}
      </Box>
      <Box width="50%" className={classes.heroRight}></Box>
    </Box>
  );
};

export default Hero;
