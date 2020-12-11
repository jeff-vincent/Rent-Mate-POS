import {
  UPDATE_BASIC_INFO_NAME, UPDATE_BASIC_INFO_BUSINESS, UPDATE_BASIC_INFO_WEBSITE, UPDATE_BASIC_INFO_STREET, UPDATE_BASIC_INFO_CITY, UPDATE_BASIC_INFO_STATE, UPDATE_BASIC_INFO_ZIP,
} from "../actions/types";

export const updateBasicInfoName = (payload) => {
  return {
    type: UPDATE_BASIC_INFO_NAME,
    payload,
  };
};
export const updateBasicInfoBusiness = (payload) => {
  return {
    type: UPDATE_BASIC_INFO_BUSINESS,
    payload,
  };
};
export const updateBasicInfoWebsite = (payload) => {
  return {
    type: UPDATE_BASIC_INFO_WEBSITE,
    payload,
  };
};
export const updateBasicInfoStreet = (payload) => {
  return {
    type: UPDATE_BASIC_INFO_STREET,
    payload,
  };
};
export const updateBasicInfoCity = (payload) => {
  return {
    type: UPDATE_BASIC_INFO_CITY,
    payload,
  };
};
export const updateBasicInfoState = (payload) => {
  return {
    type: UPDATE_BASIC_INFO_STATE,
    payload,
  };
};
export const updateBasicInfoZip = (payload) => {
  return {
    type: UPDATE_BASIC_INFO_ZIP,
    payload,
  };
};