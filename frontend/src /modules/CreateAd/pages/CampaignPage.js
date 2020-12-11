import React, { useState } from "react";
import { Box, Grid, Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import RightColumnWrapper from "../components/Wrapper.RightColumn";
import LeftColumnWrapper from "../components/Wrapper.LeftColumn";
import CampaignImageDisplay from "../components/Campaign.ImageDisplay";
import CreateCampaignForm from "../components/Campaign.Form";


const CreateCampaign = ({ handleSubmitCampaign, ...props }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    ad_description: "Description goes here",
    url: "GO TO",
    file_url:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80",
  });

  const goToNext = () => {
    handleSubmitCampaign(formData);
    history.push("/create/connect-social");
  };

  return (
    <Box maxWidth="950px">
      <Box marginBottom="3rem">
        <Typography variant="h2">Create an Ad</Typography>
      </Box>
      <Grid container>
        <Grid item sm={12} md={6}>
          <LeftColumnWrapper>
            <CampaignImageDisplay form={formData} {...props} />
          </LeftColumnWrapper>
        </Grid>
        <Grid item sm={12} md={6}>
          <RightColumnWrapper>
            <CreateCampaignForm
              handleUpdateForm={(formInput) => setFormData(formInput)}
              {...props}
            />
            <Box marginTop={3} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={goToNext}>
                Next
              </Button>
            </Box>
          </RightColumnWrapper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateCampaign;
