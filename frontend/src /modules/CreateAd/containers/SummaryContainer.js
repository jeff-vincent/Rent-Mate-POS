import React, { useEffect } from "react";
import { connect } from "react-redux";

import SummaryPage from "../pages/SummaryPage";

import { getCampaign, makeCurrent } from '../../../actions/campaignActions';
import { postGoogleSearchAd } from '../../../actions/gsAdActions';
import { postFBFeedAd } from '../../../actions/fbAdActions';

const SummaryContainer = ({ 
  postGoogleSearchAd, 
  postFBFeedAd, 
  adInfo, 
  campaigns, 
  currentCampaign, 
  getCampaign, 
  makeCurrent, 
  socialsToPost 
}) => {
  useEffect(() => {
    // Get campaigns
    getCampaign();
    
  }, [])
  // Check if not currentCampaign
  if (Object.keys(currentCampaign).length === 0 && currentCampaign.constructor === Object) {
    if (campaigns.length >= 1) {
      makeCurrent(campaigns[campaigns.length - 1])
    }
    
  }
  
  const onClick = () => {
    let adId = currentCampaign.id
    let formData = new FormData()
    formData.append("ad_id", adId)
    if (socialsToPost.includes('facebook ad')) {
      // Post Ad to Facebook
      postFBFeedAd(formData);
    } else if (socialsToPost.includes('google adwords')) {
      // Post Ad to Google
      postGoogleSearchAd(formData);
    }
  }
  
  return (
    <SummaryPage
      currentCampaign={currentCampaign}
      targetingInfo={adInfo.targetingInfo}
      budgetInfo={adInfo.budgetInfo}
      onHandleClick={onClick}
      onMakeCurrent={makeCurrent}
    />
  );
};

const mapStateToProps = (state) => ({
  adInfo: state.newAdInfo,
  currentCampaign: state.campaigns.current,
  campaigns: state.campaigns.campaigns,
  socialsToPost: state.newAdInfo.socialsToPost,
});

export default connect(mapStateToProps, { postGoogleSearchAd, postFBFeedAd, getCampaign, makeCurrent })(SummaryContainer);
