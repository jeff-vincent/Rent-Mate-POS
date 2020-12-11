import React, { useEffect } from "react";

import { connect } from "react-redux";

import ConnectSocialPage from "../pages/ConnectSocialPage";
import { getCampaign, updateCampaign, makeCurrent } from "../../../actions/campaignActions";
import { updateSocials } from "../../../actions/formInfoActions";
import { getFbAdAccounts } from "../../../actions/account.fbAdActions";
import { getGoogleAdAccounts } from "../../../actions/account.googleAdActions";
import { getBusinessInfo } from "../../../actions/businessInfoActions";

/**
 *
 * @param { socialsToPost: Array<string> } - redux state, an array of social media the user wants to post to
 * @param { updateSocials: Function } - redux action to update socialsToPost state
 * @param { campaigns: CurrentCampaign } - redux state, the current campaign the user is currently on
 */
const CreateCampaignContainer = ({
  socialsToPost,
  updateSocials,
  campaigns,
  currrentCampaign,
  getGoogleAdAccounts, 
  getFbAdAccounts, 
  getBusinessInfo,
  getCampaign,
  updateCampaign,
  makeCurrent,
}) => {
  useEffect(() => {
    getFbAdAccounts();
    getGoogleAdAccounts();
    getBusinessInfo();
    getCampaign();
  }, [])
  useEffect(() => {
    makeCurrent(campaigns[campaigns.length - 1])
  }, [campaigns])
  const submitSocials = () => {
    let formData = new FormData();
    let platforms = `${socialsToPost}`
    console.log('platforms::::', platforms)
    formData.append("platforms", platforms)
    // Get campaign Id from state
    let campaignId = currrentCampaign.id;
    // Save Targeting options to Campaign_Info
    updateCampaign(formData, campaignId)
  }
  return (
    <ConnectSocialPage
      socialsToPost={socialsToPost}
      handleUpdateSocial={(socials) => updateSocials(socials)}
      handleSubmitSocials={submitSocials}
      currentCampaign={currrentCampaign}
    />
  );
};

const mapStateToProps = (state) => ({
  campaigns: state.campaigns.campaigns,
  currrentCampaign: state.campaigns.current,
  socialsToPost: state.newAdInfo.socialsToPost,
});

export default connect(mapStateToProps, { updateSocials, getGoogleAdAccounts, getFbAdAccounts, getBusinessInfo, getCampaign, updateCampaign, makeCurrent })(
  CreateCampaignContainer
);
