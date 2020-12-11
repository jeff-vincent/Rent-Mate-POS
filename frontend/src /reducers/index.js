import { combineReducers } from "redux";

import accounts_FbAdReducer from "./accounts.FbAdReducer";
import accounts_GoogleAdReducer from "./accounts.GoogleAdReducer";
import accounts_GoogleManagerReducer from "./accounts.GoogleManagerReducer";
import ads_FbFeedReducer from "./ads.FbFeedReducer";
import ads_googleSearchReducer from "./ads.googleSearchReducer";
import targeting_FbReducer from "./targeting.fbReducer";
import targeting_GoogleReducer from "./targeting.GoogleReducer";
import userInfoReducer from "./userInfoReducer";
import basicInfoReducer from "./basicInfoReducer";
import socialInfoReducer from "./socialInfoReducer";
import authReducer from "./authReducer";
import errorsReducer from "./errorsReducer";
import messagesReducer from "./messagesReducer";
import campaignReducer from "./campaignReducer";
import createFormReducer from "./ads.createFormReducer";
import businessInfoReducer from "./businessInfoReducer";

export default combineReducers({
  fbAdAccount: accounts_FbAdReducer,
  googleAdAccount: accounts_GoogleAdReducer,
  googleManagerAccount: accounts_GoogleManagerReducer,
  fbFeedAd: ads_FbFeedReducer,
  googleSearchAd: ads_googleSearchReducer,
  fbTargeting: targeting_FbReducer,
  googleTargeting: targeting_GoogleReducer,
  errors: errorsReducer,
  messages: messagesReducer,
  auth: authReducer,
  campaigns: campaignReducer,
  newAdInfo: createFormReducer,
  userInfo: userInfoReducer,
  basicInfo: basicInfoReducer,
  socialInfo: socialInfoReducer,
  businessInfo: businessInfoReducer,
});
