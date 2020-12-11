import axios from "axios";
// import { returnErrors } from "./messages";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";
import { headerConfig } from "../helperFunctions/headerConfig";
// import { loadAuth2, loadAuth2WithProps } from 'gapi-script';
import {
  GOOGLE_OAUTH2_KEY,
  FACEBOOK_KEY
} from '../environmentVariables';


export const connectGoogleOAuth = async (access_token) => {
  axios
    .post("http://localhost:8000/api/social/google-oauth2", access_token)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const connectFacebookAuth = (access_token) => {
  axios
    .post("http://localhost:8000/api/social/facebook", access_token)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

// Load authenticated user from server
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get("http://localhost:8000/api/auth/user", localStorage.getItem("token"))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("ERROR:", err);
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

/**
 * Takes in a string representing the user's us
 *
 * @param { data: { username: string, password: string } } - an object containing the user's username and password provided
 */

export const login = (data) => (dispatch) => {

  const errorParsing = errorMessage => {
    return errorMessage.length > 100 ? 
    errorMessage.substring(0, 50) :
    errorMessage;
  } 

  axios
    .post("http://localhost:8000/api/auth/login", data)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOGIN_FAIL,
        payload: {
          isError: true,
          errorMessage: errorParsing(err.message)
        },
      });
    });
};

// REGISTER USER
export const register = ({ username, password, email }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ username, email, password });

  axios
    .post("http://localhost:8000/api/auth/register", body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      // dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

/**
 * Logouts user from databse and application state
 */
export const logout = () => (dispatch, getState) => {
  // axios
  //   .post("http://localhost:8000/api/auth/logout/", null, headerConfig)
  //   .then((res) => {
      localStorage.removeItem("token");
      dispatch({ type: "CLEAR_LEADS" });
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    // })
    // .catch((err) => {
    //   // dispatch(returnErrors(err.response.data, err.response.status));
    // });
};
// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;
  var config = {
    headers: {},
  };

  // If token, add to headers config
  if (token && config) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
