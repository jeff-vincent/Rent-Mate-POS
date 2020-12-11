import {
  GET_CAMPAIGNS,
  SET_CAMPAIGN_LOADING,
  DELETE_CAMPAIGN,
  SAVE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  MAKE_CURRENT,
} from "./types";
import axios from "axios";
// import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./authActions";

// Get Ads From Server
export const getCampaign = () => (dispatch, getState) => {
  setCampaignLoading();
  axios
    .get("http://localhost:8000/api/campaign/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_CAMPAIGNS,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Delete facebook feed ad from server
export const deleteCampaign = (id) => (dispatch, getState) => {
  setCampaignLoading();
  axios
    .delete(
      `http://localhost:8000/api/campaign/${id}/`,
      tokenConfig(getState)
    )
    .then((res) => {
      // dispatch(createMessage({ deleteCampaign: "Ad Deleted" }));
      dispatch({
        type: DELETE_CAMPAIGN,
        payload: id,
      });
    });
  // .catch((err) => dispatch(returnErrors(err)));
};

// Update facebook feed ad on server
export const updateCampaign = (campaign, id) => (dispatch, getState) => {
  setCampaignLoading();
  axios
    .put(
      `http://localhost:8000/api/campaign/${id}/`,
      campaign,
      tokenConfig(getState)
    )
    .then((res) => {
      // dispatch(createMessage({ updateCampaign: "Ad Updated" }));
      dispatch({
        type: UPDATE_CAMPAIGN,
        payload: res.data,
      });
    });
  // .catch((err) => dispatch(returnErrors(err)));
};

// Post Add to API
export const addCampaign = (campaign) => (dispatch, getState) => {
  setCampaignLoading();
  axios
    .post(
      `http://localhost:8000/api/campaign/`,
      campaign,
      tokenConfig(getState)
    )
    .then((res) => {
      // dispatch(createMessage({ addCampaign: "Ad Added" }));
      dispatch({
        type: SAVE_CAMPAIGN,
        payload: res.data,
      });
    });
  // .catch((err) => dispatch(returnErrors(err)));
};

export const makeCurrent = (payload) => ({
  type: MAKE_CURRENT,
  payload,
});

// Set Loading state
export const setCampaignLoading = () => {
  return {
    type: SET_CAMPAIGN_LOADING,
  };
};
