import {
  GET_SOCIAL_AUTHS,
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";

// Get user oauth credentials from backend
export const getSocialAuths = () => (dispatch, getState) => {
  setSocialAuthsLoading();
  axios
    .get("http://localhost:8000/api/user-social-auth/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_SOCIAL_AUTHS,
        payload: res.data,
      });
    })
    .catch(
      (err) => console.log(err)
      // dispatch(returnErrors(err.response.data, err.response.status))
    );
};


// Set loading state
export const setSocialAuthsLoading = () => {
  return {
    type: SET_SOCIAL_AUTHS_LOADING,
  };
};
