import React from "react";

import { Box, Grid, Button, Typography } from "@material-ui/core";

import RightColumnWrapper from "../components/Wrapper.RightColumn";
import SummaryInfo from "../components/SummaryInfo";


const SummaryPage = (props) => {
  
  return (
    <Box maxWidth="950px">
      <Box marginBottom="3rem">
        <Typography variant="h2">Create an Ad</Typography>
      </Box>
      <Grid container>
        <Grid item sm={12} md={6}>
          <RightColumnWrapper>
            <SummaryInfo {...props} />
          </RightColumnWrapper>
        </Grid>
      </Grid>
    </Box>
  );
};



export default SummaryPage;
