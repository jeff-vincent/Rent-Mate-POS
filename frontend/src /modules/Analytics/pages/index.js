import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {},
});

const AnalyticsMainPage = () => {
  const classes = useStyles();
  return (
    <Box>
      <Typography variant="h2">Anaytics Main</Typography>
    </Box>
  );
};

export default AnalyticsMainPage;
