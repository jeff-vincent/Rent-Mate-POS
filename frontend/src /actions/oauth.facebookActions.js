import {
  SAVE_FB_TOKEN,
} from "./types";
import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./authActions";

// Get Groups of Users Based On Interest


// Post fb Token to API
export const addFbToken = (authCode) => (dispatch, getState) => {
  axios
    .post(`http://localhost:8000/api/social/facebook/`, authCode, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addFbToken: "Facebook Account Connected." }));
      dispatch({
        type: SAVE_FB_TOKEN,
        payload: res,
      });
    })
    .catch((err) => dispatch(returnErrors(err)));
};