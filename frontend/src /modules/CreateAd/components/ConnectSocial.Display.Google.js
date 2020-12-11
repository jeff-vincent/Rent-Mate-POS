import React from "react";
import { Paper, Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    padding: "1rem 2rem",
  },
  AD: {
    fontFamily: "Arial",
    fontWeight: 800,
    marginRight: "1rem",
  },
  mainDescription: {
    fontSize: "18pt",
    color: "#30309e",
  },
  url: {
    marginRight: ".5rem",
  },
  downArrow: {
    fontSize: "10pt",
  },
});

const GoogleSocialDisplay = ({ currentCampaign }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={2}>
      <Box display="flex">
        <Typography className={classes.AD}>Ad</Typography>
        <Typography className={classes.url}>www.something.com</Typography>
        <Typography className={classes.downArrow}>&#9662;</Typography>
      </Box>
      <Box display="flex">
        <Typography className={classes.mainDescription}>
          description goes here
        </Typography>
        {/* <Typography>{currentCampaign?.ad_description}</Typography> */}
      </Box>
      <Box textAlign="left">
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </Typography>
      </Box>
    </Paper>
  );
};

export default GoogleSocialDisplay;
