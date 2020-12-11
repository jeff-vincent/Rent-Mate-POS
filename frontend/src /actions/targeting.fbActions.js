import {
  SET_INTERESTS,
  GET_INTERESTS,
  DELETE_INTEREST,
  SAVE_INTEREST,
  SET_LOCATIONS,
  GET_LOCATIONS,
  DELETE_LOCATION,
  SAVE_LOCATION,
  SET_INTEREST_LOADING,
  SET_LOCATION_LOADING,
} from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./authActions";




// Get Interests from server
export const searchFBInterests = (searchTerm) => (dispatch, getState) => {
  setInterestLoading();
  axios
    .post(
      "http://localhost:8000/api/search-facebook-interests/",
      searchTerm,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: SET_INTERESTS,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};


// Set List of interests
export const setInterestList = (data) => (dispatch) => {
  setInterestLoading();
  try {
    dispatch({
      type: SET_INTERESTS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    // dispatch(returnErrors(err.response.data, err.response.status))
  }
};

// Get Groups of Users Based On Interest from server
export const getFBInterests = () => (dispatch, getState) => {
  setInterestLoading();
  axios
    .get("http://localhost:8000/api/fb-interests/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_INTERESTS,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Delete Facebook Interests from server
export const deleteFBInterests = (id) => (dispatch, getState) => {
  setInterestLoading();
  axios
    .delete(
      `http://localhost:8000/api/fb-interests/${id}/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ deleteFBInterests: "Ad Deleted" }));
      dispatch({
        type: DELETE_INTEREST,
        payload: id,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};
// Post Add to API
export const addFBInterests = (FBInterest) => (dispatch, getState) => {
  setInterestLoading();
  axios
    .post(
      `http://localhost:8000/api/fb-interests/`,
      FBInterest,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ addFBInterests: "Ad Added" }));
      dispatch({
        type: SAVE_INTEREST,
        payload: res,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};

// Select Target Locations


// Get locations from server
export const searchFBLocations = (searchTerm) => (dispatch, getState) => {
  setLocationLoading();
  axios
    .post(
      "http://localhost:8000/api/search-facebook-geotargets/",
      searchTerm,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: SET_LOCATIONS,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};


// Set List of target locations based on search term
export const setLocationList = (data) => (dispatch) => {
  setLocationLoading();
  try {
    dispatch({
      type: SET_LOCATIONS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    // dispatch(returnErrors(err.response.data, err.response.status))
  }
};

// Get list of Locataions from server
export const getFBLocations = () => (dispatch, getState) => {
  setLocationLoading();
  axios
    .get("http://localhost:8000/api/fb-locations/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LOCATIONS,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Delete Locations from the server
export const deleteFBLocations = (id) => (dispatch, getState) => {
  setLocationLoading();
  axios
    .delete(
      `http://localhost:8000/api/fb-locations/${id}/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ deleteFBLocations: "Ad Deleted" }));
      dispatch({
        type: DELETE_LOCATION,
        payload: id,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};

// Post Location data to server
export const addFBLocations = (FBLocations) => (dispatch, getState) => {
  setLocationLoading();
  axios
    .post(
      `http://localhost:8000/api/fb-locations/`,
      FBLocations,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ addFBLocations: "Ad Added" }));
      dispatch({
        type: SAVE_LOCATION,
        payload: res,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};

// Set Loading state for locations and interests
export const setInterestLoading = () => {
  return {
    type: SET_INTEREST_LOADING,
  };
};
export const setLocationLoading = () => {
  return {
    type: SET_LOCATION_LOADING,
  };
};
