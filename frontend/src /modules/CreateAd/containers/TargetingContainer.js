import React, {useEffect, useState} from "react";
import { connect } from "react-redux";

import TargetingPage from "../pages/TargetingPage";
import { updateTargetInfo } from "../../../actions/formInfoActions";
import { addFBLocations, addFBInterests, searchFBInterests, searchFBLocations, } from "../../../actions/targeting.fbActions";
import { saveGoogleKeywordPlan, addGoogleLocations, searchGoogleKeywords, searchGoogleLocations, addKeywordtoPlan } from "../../../actions/targeting.googleActions";
import { getAddresses } from "../../../actions/userInfoActions";
import { getBusinessInfo } from "../../../actions/businessInfoActions";
import { updateCampaign } from "../../../actions/campaignActions";

const TargetingContainer = ({ campaigns, keywords, keywordList, keywordPlan, addresses, getAddresses, getBusinessInfo, updateCampaign, updateTargetInfo, addFBLocations, addFBInterests, searchFBInterests, searchFBLocations, saveGoogleKeywordPlan, addGoogleLocations, searchGoogleKeywords, searchGoogleLocations, addKeywordtoPlan,  }) => {
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  useEffect(() => {
    // Get info from server to populate defaults when component loads
    getAddresses();
    getBusinessInfo();
    // eslint-disable-next-line
  }, []);

  const submitTargetInfo = (targetInfo) => {
    // TODO
    // hook up targeting action to handle posting the target info
    if (addresses) {
      console.log('addresses::::', addresses)
      for (let i = 0; i < addresses.length; i++){
        let indexAddress = addresses[i]
        
        if (indexAddress.default == true){
          setStreet(indexAddress.street)
          setState(indexAddress.state)
          setCountry(indexAddress.country)
          setZip(indexAddress.zip)
        }
      }
    }
    else if (addresses) {
      console.log('addresses::::', addresses)
      for (let i = 0; i < addresses.length; i++){
        let indexAddress = addresses[i]
        
        if (indexAddress.default == true){
          setStreet(indexAddress.street)
          setState(indexAddress.state)
          setCountry(indexAddress.country)
          setZip(indexAddress.zip)
        }
      }
    }
    console.log('street::::', street)
    console.log('state::::', state)
    console.log('country::::', country)
    console.log('zip::::', zip)
    // console.log('targetInfo::::', targetInfo);
    // Use location information to automatically select Facebook geotargeting.
    let formDataCampaign = new FormData();
    let formDataFBLocations = new FormData();
    // Check if anywhere
    if (targetInfo.distance === 'anywhere') {
      // Set to default nation profile (big 5)
      formDataCampaign.append("geotargeting", 'anywhere');
    // Check if Nationwide 
    } else if (targetInfo.distance === 'nationwide'){
      formDataCampaign.append("geotargeting", 'nationwide');
    // Else
    } else {
      // Get list of facebook locations
      // searchFBLocations(`${addresses.city} ${addresses.state} ${addresses.country}`);
      // Use address to automatically select a default location
      // Save location to server
      formDataFBLocations.append("name", '');
      formDataFBLocations.append("key", '');

      // Search Google Locations
      let formDataGoogleInterestSearch = new FormData();
        formDataGoogleInterestSearch.append("search_term", `${addresses.city}, ${addresses.state}, ${addresses.country}`);
      searchGoogleLocations(formDataGoogleInterestSearch);
      // Use address to automatically select a default location
      
      // Save Google geotargeting profile to server
      let formDataGoogleLocations = new FormData();
      formDataGoogleLocations.append("name", '');
      formDataGoogleLocations.append("key", '');
      addGoogleLocations(formDataGoogleLocations);
      // Check if local
      if (targetInfo.distance === 'local'){
        // Set local distance
        formDataCampaign.append("geotargeting", 'local');
      } else {
        // Set a drive distance
        formDataCampaign.append("geotargeting", 'drive');

      }
    }
    // Save facebook geotargeting profile to server
    formDataFBLocations.append("name", '');
    formDataFBLocations.append("key", '');
    addFBLocations(formDataFBLocations);
    if (targetInfo.interests.length !== 0){
      for (let interest in targetInfo.interests){

      
        // Search Facebook Interests
        let formDataFBInterestSearch = new FormData();
        formDataFBInterestSearch.append("search_term", interest);
        searchFBInterests(formDataFBInterestSearch)
        
        //  Use interest info to automatically select facebook interest groups
        let formDataFBInterests = new FormData();
        formDataFBInterests.append("name", '');
        formDataFBInterests.append("audience_size", '');
        formDataFBInterests.append("topic", '');
        formDataFBInterests.append("facebook_id", '');
        addFBInterests(formDataFBInterests);
        // Add interest to Campaign
        formDataCampaign.append("interest_targeting", '');
        // Search for google keywords
        let formDataGoogleKeywordSearch = new FormData();
        formDataGoogleKeywordSearch.append("search_term", interest);
        searchGoogleKeywords(formDataGoogleKeywordSearch)
        for (let i = 0; i <= 10; i++){
          // Use keywords to Generate Google keyword plan.
          let formDataGoogleKeyword = new FormData();
          formDataGoogleKeyword.append("keyword_idea_text", keywordList[0].keyword_idea_text);
          formDataGoogleKeyword.append("audience_size", keywordList[0].audience_size);
          formDataGoogleKeyword.append("topic", keywordList[0].topic);
          formDataGoogleKeyword.append("id", keywordList[0].id);
          addKeywordtoPlan(formDataGoogleKeyword);
        }
        let formDataKeywordPlan = new FormData();
        // Add keyword plan to Campaign
        formDataKeywordPlan.append("name", interest);
        formDataKeywordPlan.append("keyword_plan", keywordPlan);
        saveGoogleKeywordPlan(formDataKeywordPlan);
      }
    }
    // Get campaign Id from state
    let campaignId = campaigns.current.id;
    // Save Targeting options to Campaign_Info
    updateCampaign(formDataCampaign, campaignId);
    updateTargetInfo(targetInfo);
  };

  return <TargetingPage addresses={addresses} handleSumbitTargetInfo={submitTargetInfo} />;
};

const mapStateToProps = (state) => ({
  addresses: state.userInfo.addresses,
  businessInfo: state.businessInfo.addresses,
  campaigns: state.campaigns,
  keywords: state.googleTargeting.keywords,
  keywordList: state.googleTargeting.keywordList,
  keywordPlan: state.googleTargeting.keywordPlan,
});

export default connect(mapStateToProps, { getAddresses, getBusinessInfo, updateCampaign, updateTargetInfo, addFBLocations, addFBInterests, searchGoogleKeywords, saveGoogleKeywordPlan, addKeywordtoPlan, searchGoogleLocations, addGoogleLocations, searchFBInterests, searchFBLocations })(TargetingContainer);
