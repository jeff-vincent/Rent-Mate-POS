import React from "react";
import CreateCampaign from "../pages/CampaignPage";
import { connect } from "react-redux";
import { addCampaign, makeCurrent } from "../../../actions/campaignActions";

/**
 *
 * @param { campaigns: CampaignInfo }  - redux state that contains information about the users campaigns, including the current one
 * @param { makeCurren: Function } - a redux action that takes in a string representing a campaign, and makes it the current campaign
 * @param { postCampaigns: Function } - a redux action that creates new campaigns
 */
const CreateCampaignContainer = ({ addCampaign, postCampaigns, makeCurrent, campaigns }) => {
  const submitCampaign = (formData) => {
    // TO_DO:
    // right now postCampaigns just updates the state, need to update the database
    // in order to post the campaigns to the database, we need to get the user's id
    console.log('formData::::',formData)
    addCampaign(formData);
    // makeCurrent(formData);;
  };

  return (
    <CreateCampaign
      handleSubmitCampaign={submitCampaign}
      currentCampaign={campaigns.current}
    />
  );
};

const mapStateToProps = (state) => ({
  campaigns: state.campaigns,
  // currentCampaign: state.campaigns.current,
});

export default connect(mapStateToProps, {
  addCampaign,
  makeCurrent,
})(CreateCampaignContainer);
