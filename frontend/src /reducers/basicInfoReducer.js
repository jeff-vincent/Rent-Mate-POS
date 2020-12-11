import {
  UPDATE_BASIC_INFO_NAME, UPDATE_BASIC_INFO_BUSINESS, UPDATE_BASIC_INFO_WEBSITE, UPDATE_BASIC_INFO_STREET, UPDATE_BASIC_INFO_CITY, UPDATE_BASIC_INFO_STATE, UPDATE_BASIC_INFO_ZIP,
} from "../actions/types";


// Set Facebook feed ad state
const defaultValues = {
  personalName: "",
  businessName: "",
  businessUrl: "",
  streetAddress: "",
  city: "",
  stateCode: "",
  zipCode: "",
};

export default (state = defaultValues, action) => {
  switch (action.type) {
    case UPDATE_BASIC_INFO_NAME: 
      return {
        ...state,
        personalName: action.payload,
      };
    case UPDATE_BASIC_INFO_BUSINESS: 
      return {
        ...state,
        businessName: action.payload,
      };
    case UPDATE_BASIC_INFO_WEBSITE: 
      return {
        ...state,
        businessUrl: action.payload,
      };
    case UPDATE_BASIC_INFO_STREET: 
      return {
        ...state,
        streetAddress: action.payload,
      };
    case UPDATE_BASIC_INFO_CITY: 
      return {
        ...state,
        city: action.payload,
      };
    case UPDATE_BASIC_INFO_STATE: 
      return {
        ...state,
        stateCode: action.payload,
      };
    case UPDATE_BASIC_INFO_ZIP: 
      return {
        ...state,
        zipCode: action.payload,
      };
    default:
      return state;
  }
};