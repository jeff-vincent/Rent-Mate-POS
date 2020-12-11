import React from "react";
import { Grid, Box } from "@material-ui/core";
import BasicInfoForm from "../components/BasicInfoForm";
import { useForm } from "react-hook-form";

import OnboardingText from "../components/OnboardingText";
import BackAndNextButtons from "../components/BackAndNextButtons";
import OnboardingHeader from "../components/OnboardingHeader";

const OnboardingWrapper = (props) => {
  return (
    <Box margin={5}>
      <OnboardingHeader />
      <Box marginTop={5}>
        <BackAndNextButtons {...props} />
      </Box>
      <Box marginTop={5}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <OnboardingText {...props} />
          </Grid>
          <Grid item xs={12} md={6}>
            {props.children}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OnboardingWrapper;
