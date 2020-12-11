import {
  SET_GOOGLE_KEYWORDS,
  GET_GOOGLE_KEYWORDS,
  DELETE_GOOGLE_KEYWORD,
  SAVE_GOOGLE_KEYWORD,
  SET_GOOGLE_INTERESTS,
  GET_GOOGLE_INTERESTS,
  DELETE_GOOGLE_INTEREST,
  SAVE_GOOGLE_INTEREST,
  SET_GOOGLE_LOCATIONS,
  GET_GOOGLE_LOCATIONS,
  DELETE_GOOGLE_LOCATION,
  SAVE_GOOGLE_LOCATION,
  SET_GOOGLE_KEYWORD_LOADING,
  SET_GOOGLE_INTEREST_LOADING,
  SET_GOOGLE_LOCATION_LOADING,
  ADD_KEYWORD_TO_PLAN,
  DELETE_KEYWORD_FROM_PLAN,
} from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./authActions";

// Get Keyword Ideas and Develop a keyword Plan with the Google Ads API

// Get Keywords from server
export const getGoogleKeywordPlans = () => (dispatch, getState) => {
  setKeywordLoading();
  axios
    .get("http://localhost:8000/api/ga-keywords/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_GOOGLE_KEYWORDS,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Get Keywords from server
export const searchGoogleKeywords = (searchTerm) => (dispatch, getState) => {
  setKeywordLoading();
  axios
    .post(
      "http://localhost:8000/api/ga-keyword-search/",
      searchTerm,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: SET_GOOGLE_KEYWORDS,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Delete Keywords on server
export const deleteGoogleKeywords = (id) => (dispatch, getState) => {
  setKeywordLoading();
  axios
    .delete(
      `http://localhost:8000/api/ga-keywords/${id}/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ deleteGoogleKeywords: "Ad Deleted" }));
      dispatch({
        type: DELETE_GOOGLE_KEYWORD,
        payload: id,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};

// Save Keyword plan to server
export const saveGoogleKeywordPlan = (KeywordPlan) => (dispatch, getState) => {
  setKeywordLoading();
  axios
    .post(
      `http://localhost:8000/api/ga-keywords/`,
      KeywordPlan,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ saveGoogleKeywords: "Ad Added" }));
      dispatch({
        type: SAVE_GOOGLE_KEYWORD,
        payload: res,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};
// Add Keywords to Keyword Plan List in Redux State
export const addKeywordtoPlan = (GoogleKeyword) => (dispatch) => {
  setKeywordLoading();
  try {
    dispatch(createMessage({ addGoogleKeywords: "Ad Added" }));
    dispatch({
      type: ADD_KEYWORD_TO_PLAN,
      payload: GoogleKeyword,
    });
  } catch (err) {
    console.log(err);
    // dispatch(returnErrors(err.response.data, err.response.status))
  }
};
// Add Keywords from Keyword Plan List in Redux State
export const deleteKeywordfromPlan = (GoogleKeyword) => (dispatch) => {
  setKeywordLoading();
  try {
    dispatch(
      createMessage({ deleteGoogleKeywords: "Keyword Removed from Plan." })
    );
    dispatch({
      type: DELETE_KEYWORD_FROM_PLAN,
      payload: GoogleKeyword,
    });
  } catch (err) {
    console.log(err);
    // dispatch(returnErrors(err.response.data, err.response.status))
  }
};

// Narrow audiences based on topic of Interest

// Get interests from server
export const getGoogleInterests = () => (dispatch, getState) => {
  setInterestLoading();
  axios
    .get("http://localhost:8000/api/ga-interests/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_GOOGLE_INTERESTS,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Get interests from server
export const searchGoogleInterests = (searchTerm) => (dispatch, getState) => {
  setInterestLoading();
  axios
    .post(
      "http://localhost:8000/ga-interests/",
      searchTerm,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: SET_GOOGLE_INTERESTS,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Delete interests on server
export const deleteGoogleInterests = (id) => (dispatch, getState) => {
  setInterestLoading();
  axios
    .delete(
      `http://localhost:8000/api/ga-interests/${id}/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ deleteGoogleInterests: "Ad Deleted" }));
      dispatch({
        type: DELETE_GOOGLE_INTEREST,
        payload: id,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};

// Post Add to server
export const addGoogleInterests = (GoogleInterest) => (dispatch, getState) => {
  setInterestLoading();
  axios
    .post(
      `http://localhost:8000/api/ga-interests/`,
      GoogleInterest,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ addGoogleInterests: "Ad Added" }));
      dispatch({
        type: SAVE_GOOGLE_INTEREST,
        payload: res,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};

// Select Target Locations

// Get locations from server
export const getGoogleLocations = (searchTerm) => (dispatch, getState) => {
  setLocationLoading();
  axios
    .get("http://localhost:8000/api/ga-locations/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_GOOGLE_LOCATIONS,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Get locations from server
export const searchGoogleLocations = (searchTerm) => (dispatch, getState) => {
  setLocationLoading();
  axios
    .post(
      "http://localhost:8000/api/ga-geotargets/",
      searchTerm,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: SET_GOOGLE_LOCATIONS,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// delete locations from server
export const deleteGoogleLocations = (id) => (dispatch, getState) => {
  setLocationLoading();
  axios
    .delete(
      `http://localhost:8000/api/ga-locations/${id}/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ deleteGoogleLocations: "Ad Deleted" }));
      dispatch({
        type: DELETE_GOOGLE_LOCATION,
        payload: id,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};
// Post locations to server
export const addGoogleLocations = (GoogleLocations) => (dispatch, getState) => {
  setLocationLoading();
  axios
    .post(
      `http://localhost:8000/api/ga-locations/`,
      GoogleLocations,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ addGoogleLocations: "Ad Added" }));
      dispatch({
        type: SAVE_GOOGLE_LOCATION,
        payload: res,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};

// Set loading state
export const setInterestLoading = () => {
  return {
    type: SET_GOOGLE_INTEREST_LOADING,
  };
};
export const setKeywordLoading = () => {
  return {
    type: SET_GOOGLE_KEYWORD_LOADING,
  };
};
export const setLocationLoading = () => {
  return {
    type: SET_GOOGLE_LOCATION_LOADING,
  };
};
