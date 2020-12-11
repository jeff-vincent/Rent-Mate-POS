import React, { useEffect } from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import RightColumnWrapper from "../components/Wrapper.RightColumn";
// import LeftColumnWrapper from "../components/Wrapper.LeftColumn";
import TargetingForm from "../components/Targeting.Form";

const TargetingPage = (props) => {
  const history = useHistory();
  return (
    <Box marginBottom="5rem">
      <Box marginBottom="3rem">
        <Typography variant="h2">Targeting</Typography>
      </Box>
      <Grid container>
        {/* <Grid item sm={12} md={6}>
          <LeftColumnWrapper>Targeting Summary</LeftColumnWrapper>
        </Grid> */}
        <Grid item sm={12} md={6}>
          <RightColumnWrapper>
            <TargetingForm {...props} />
          </RightColumnWrapper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TargetingPage;
