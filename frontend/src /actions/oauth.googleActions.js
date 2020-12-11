import {
  SAVE_GOOGLE_TOKEN,
} from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./authActions";

// Get Groups of Users Based On Interest


// Post Google Token to API
export const addGoogleToken = (authCode) => (dispatch, getState) => {
  axios
    .post(`http://localhost:8000/api/google-auth-connect/`, authCode, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addGoogleToken: "Google Account Connected." }));
      dispatch({
        type: SAVE_GOOGLE_TOKEN,
        payload: res,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};