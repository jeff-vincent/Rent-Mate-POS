import React, { useState, Fragment } from "react";

import { connect } from "react-redux";

import ConnectSocialPage from "../pages/ConnectSocialPage";
import FacebookConnect from "../pages/ConnectSocialPage";
import GoogleConnect from "../pages/ConnectSocialPage";
import { updateSocials } from "../../../actions/formInfoActions";
import { updateCampaign } from "../../../actions/campaignActions";
import { addFbAdAccounts } from "../../../actions/account.fbAdActions";
import { addGoogleAdAccounts } from "../../../actions/account.googleAdActions";
import { addGoogleToken } from "../../../actions/oauth.googleActions";
import { addFbToken } from "../../../actions/oauth.facebookActions";

/**
 *
 * @param { socialsToPost: Array<string> } - redux state, an array of social media the user wants to post to
 * @param { updateSocials: Function } - redux action to update socialsToPost state
 * @param { campaigns: CurrentCampaign } - redux state, the current campaign the user is currently on
 */
const AccountSocialContainer = ({
  socialsToPost,
  updateSocials,
  updateCampaign,
  addFbAdAccounts,
  addGoogleAdAccounts,
  campaigns,
  fbAdAccounts,
  googleAdAccounts,
  businessName,
  addGoogleToken,
  addFbToken,

}) => {
  const [displayGoogleLogin, setDisplayGoogleLogin] = React.useState(true);
  const [displayFacebookLogin, setDisplayFacebookLogin] = React.useState(true);
  const [displayGoogleAccounts, setDisplayGoogleAccounts] = React.useState(false);
  const [displayFacebookAccounts, setDisplayFacebookAccounts] = React.useState(false);
  const [displayFacebookText, setDisplayFacebookText] = React.useState(``);
  const [displayGoogleText, setDisplayGoogleText] = React.useState(``);
  const displayGoogleOptions = () => {
    if (googleAdAccounts) {
      console.log('googleAdAccounts', googleAdAccounts)
      // Allow user to select account
      setDisplayGoogleAccounts(true)
      setDisplayGoogleLogin(false)
      console.log('RUNNING DISPLAY OPTIONS')
    } else {
      // Display google login
      setDisplayGoogleLogin(true)
      setDisplayGoogleAccounts(false)
      setDisplayGoogleText(`<GoogleConnect/>`)
      console.log('RUNNING DISPLAY OPTIONS')
    }
    
  }
  const displayFacebookOptions = () => {
    if (fbAdAccounts) {
      // Allow user to select account
      setDisplayFacebookAccounts(true)
      setDisplayFacebookLogin(false)
    } else {
      // display facebook Login
      setDisplayFacebookLogin(true)
      setDisplayFacebookAccounts(false)
      setDisplayFacebookText(`<FacebookConnect/>`)
    }
  }
  
  const submitSocials = (formData) => {
    formData.append("platforms", `${socialsToPost}`);
    // Get campaign Id from state

    let campaignId = campaigns.current.id;
    // Save Targeting options to Campaign_Info
    updateCampaign(formData, campaignId)
    if (socialsToPost.includes('facebook ad')) {
      // Check for facebook ad accounts
      if (fbAdAccounts) {
        console.log('fbAdAccounts', fbAdAccounts)
        
        // Allow user to select account
      } else {
        // If no accounts are connected create a managed account
      }
    }
      // Check for facebook feed accounts
    // else if (socialsToPost.includes('facebook feed')) {
    //   
    //   // Allow user to select account
    // } else {
      // If no accounts are connected do something
    // }
    else if (socialsToPost.includes('google adwords')) {
      // Check for google ad accounts
      if (googleAdAccounts) {
        console.log('googleAdAccounts', googleAdAccounts)
        
        // Allow user to select account
      } else {
        // If no accounts are connected create a managed account
        let fbAdFormData = new FormData;
        fbAdFormData.append("business_name", businessName)
        addFbAdAccounts()
      }
      
    }
  }
  return (
    <Fragment>
      <FacebookConnect/>
      <GoogleConnect/>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  campaigns: state.campaigns,
  socialsToPost: state.newAdInfo.socialsToPost,
  fbAdAccounts: state.fbAdAccount.adAccounts,
  googleAdAccounts: state.googleAdAccount.adAccounts,
  businessName: state.businessInfo.businessName
});


export default connect(mapStateToProps, { updateSocials, updateCampaign, addFbAdAccounts, addGoogleAdAccounts, addGoogleToken, addFbToken })(
  AccountSocialContainer
);
