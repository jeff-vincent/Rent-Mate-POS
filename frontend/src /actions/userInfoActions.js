import {
  SET_ADDRESSES,
  GET_ADDRESSES,
  DELETE_ADDRESS,
  SAVE_ADDRESS,
  SET_ADDRESS_LOADING,
} from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./authActions";

// Set List of Addresses
export const setAddressList = (data) => (dispatch) => {
  setAddressLoading();
  try {
    dispatch({
      type: SET_ADDRESSES,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    // dispatch(returnErrors(err.response.data, err.response.status))
  }
};

// Get addresses from server
export const getAddresses = () => (dispatch, getState) => {
  setAddressLoading();
  axios
    .get("http://localhost:8000/api/addresses/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_ADDRESSES,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// Delete Facebook Addresses from server
export const deleteAddresses = (id) => (dispatch, getState) => {
  setAddressLoading();
  axios
    .delete(
      `http://localhost:8000/api/addresses/${id}/`,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ deleteAddresses: "Ad Deleted" }));
      dispatch({
        type: DELETE_ADDRESS,
        payload: id,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};
// Post Add to API
export const addAddresses = (address) => (dispatch, getState) => {
  setAddressLoading();
  axios
    .post(
      `http://localhost:8000/api/addresses/`,
      address,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch(createMessage({ addAddresses: "Ad Added" }));
      dispatch({
        type: SAVE_ADDRESS,
        payload: res,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};


// Set Loading state for locations and Addresses
export const setAddressLoading = () => {
  return {
    type: SET_ADDRESS_LOADING,
  };
};
