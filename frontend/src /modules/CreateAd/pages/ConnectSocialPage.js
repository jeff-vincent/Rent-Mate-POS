import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Box, Grid, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import RightColumnWrapper from "../components/Wrapper.RightColumn";
import LeftColumnWrapper from "../components/Wrapper.LeftColumn";
import ConnectSocialForm from "../components/ConnectSocial.Form";
import SocialDisplays from "../components/ConnectSocial.Displays";
import { getFbAdAccounts } from "../../../actions/account.fbAdActions";
import { getGoogleAdAccounts } from "../../../actions/account.googleAdActions";
import { getBusinessInfo } from "../../../actions/businessInfoActions";
import { apiStates } from '../components/HelperComponents';


const ConnectSocialPage = ({ getGoogleAdAccounts, getFbAdAccounts, getBusinessInfo, handleUpdateSocial, ...props}) => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    state: apiStates.UNSET
  });
  
  useEffect(() => {
    getFbAdAccounts();
    getGoogleAdAccounts();
    getBusinessInfo();
  }, [])

  const goToNext = () => {
    let formData = new FormData();
    handleUpdateSocial(formData);
    history.push("/create/targeting");
  };

  return (
    <Box maxWidth="950px">
      <Box marginBottom="3rem">
        <Typography variant="h2">Create an Ad</Typography>
      </Box>
      <Grid container width="100%">
        <Grid item sm={12} md={6}>
          <LeftColumnWrapper>
            <SocialDisplays {...props} />
          </LeftColumnWrapper>
        </Grid>
        <Grid item sm={12} md={6}>
          <RightColumnWrapper>
            <ConnectSocialForm {...props} />
            <Box marginTop={3} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/create/create-campaign")}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={goToNext}
              >
                Next
              </Button>
            </Box>
          </RightColumnWrapper>
        </Grid>
      </Grid>
    </Box>
  );
};


export default connect(null, { getFbAdAccounts, getGoogleAdAccounts, getBusinessInfo })(
  ConnectSocialPage
);