import {
  UPDATE_FACEBOOK_ACCOUNT_INFO, UPDATE_GOOGLE_ACCOUNT_INFO,
} from "./types";


export const updateFacebookAccountInfo = (payload) => {
  return {
    type: UPDATE_FACEBOOK_ACCOUNT_INFO,
    payload,
  };
};
export const updateGoogleAccountInfo = (payload) => {
  return {
    type: UPDATE_GOOGLE_ACCOUNT_INFO,
    payload,
  };
};