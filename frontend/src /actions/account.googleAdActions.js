import {
  SET_GOOGLE_AD_ACCOUNTS,
  GET_GOOGLE_AD_ACCOUNTS,
  DELETE_GOOGLE_AD_ACCOUNT,
  SAVE_GOOGLE_AD_ACCOUNT,
  SET_GOOGLE_AD_ACCOUNT_LOADING,
} from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./authActions";

// Get ad accounts from server
export const getGoogleAdAccounts = () => (dispatch, getState) => {
  setGoogleAdAccountLoading();
  axios
    .get("http://localhost:8000/api/google-ad-account/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_GOOGLE_AD_ACCOUNTS,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};
// Get ad accounts from Google Api
export const setGoogleAdAccountList = () => (dispatch, getState) => {
  setGoogleAdAccountLoading();
  axios
    .get("http://localhost:8000/api/ga-accounts/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: SET_GOOGLE_AD_ACCOUNTS,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Delete Google ad account from server
export const deleteGoogleAdAccounts = (id) => (dispatch, getState) => {
  setGoogleAdAccountLoading();
  axios
    .delete(
      `http://localhost:8000/api/google-ad-account/${id}/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ deleteGoogleAdAccounts: "Ad Deleted" }));
      dispatch({
        type: DELETE_GOOGLE_AD_ACCOUNT,
        payload: id,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};

// Post Add Account to server
export const addGoogleAdAccounts = (GoogleAdAccount) => (
  dispatch,
  getState
) => {
  setGoogleAdAccountLoading();
  axios
    .post(
      `http://localhost:8000/api/google-ad-account/`,
      GoogleAdAccount,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ addGoogleAdAccounts: "Ad Added" }));
      dispatch({
        type: SAVE_GOOGLE_AD_ACCOUNT,
        payload: res,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};

// Set loading state
export const setGoogleAdAccountLoading = () => {
  return {
    type: SET_GOOGLE_AD_ACCOUNT_LOADING,
  };
};
