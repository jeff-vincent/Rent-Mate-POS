import React from "react";
import { Box, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';

import {
  Input,
  InputMainLabel,
  InputSmallLabel,
} from "../../../sharedComponents/components";

import SummaryCheckout from './SummaryCheckout';

// const useStyles = makeStyles((theme) => ({
//   layout: {
//     width: '40vw'
//   }
// }));


const ListItem = ({ description, content }) => {
  return (
    <div>
      --
      {description && <span>{description}:</span>}
      {content && (
        <span>
          <strong>{content}</strong>
        </span>
      )}
    </div>
  );
};

const SummaryInfo = ({ currentCampaign, targetingInfo, budgetInfo }) => {
  // const classes = useStyles();
  return (
    <section>
      <Box>
        <Box>
          <InputMainLabel>Content</InputMainLabel>
          <Box>
            <ListItem description="Title" content={currentCampaign?.campaign_name} />
            <ListItem description="Text" content={currentCampaign?.ad_description} />
            <ListItem description="Url" content={currentCampaign?.url} />
            <ListItem description="Button" content={currentCampaign?.ad_link} />
          </Box>
        </Box>
        <Box marginTop="2rem">
          <InputMainLabel>Audience</InputMainLabel>
          <Box>
            <ListItem content={targetingInfo?.content} />
            <ListItem
              description="People interested in"
              content={targetingInfo?.interest?.join("")}
            />
          </Box>
        </Box>
        <Box marginTop="2rem">
          <InputMainLabel>Campaign</InputMainLabel>
          <Box>
            <ListItem content={budgetInfo?.amount} />
            <ListItem
              description="People interested in"
              content={budgetInfo?.objective}
            />
          </Box>
        </Box>
        <Box marginTop="2rem">
          <Button variant="contained" color="secondary">
            Publish
          </Button>
        </Box>
      </Box>
      <SummaryCheckout />
    </section>
  );
};

export default SummaryInfo;
