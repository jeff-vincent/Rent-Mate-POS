import {
  SET_INTERESTS,
  GET_INTERESTS,
  DELETE_INTEREST,
  SAVE_INTEREST,
  CLEAR_INTERESTS,
  SET_LOCATIONS,
  GET_LOCATIONS,
  DELETE_LOCATION,
  SAVE_LOCATION,
  CLEAR_LOCATIONS,
  SET_INTEREST_LOADING,
  SET_LOCATION_LOADING,
  GET_ERRORS,
} from "../actions/types";

// Set Facebook targeting state
const initialState = {
  interests: null,
  interestList: null,
  locations: null,
  locationList: null,
  current: null,
  interestLoading: false,
  locationLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_INTERESTS:
      return {
        ...state,
        interests: action.payload,
        loading: false,
      };

    case SET_INTERESTS:
      return {
        ...state,
        interestList: action.payload,
        loading: false,
      };

    case DELETE_INTEREST:
      return {
        ...state,
        interests: state.interests.filter(
          (interest) => interest.id !== action.payload
        ),
      };
    case SAVE_INTEREST:
      return {
        ...state,
        interests: [[...state.interests], action.payload],
      };
    case CLEAR_INTERESTS:
      return {
        ...state,
        interests: [],
      };
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
        loading: false,
      };

    case SET_LOCATIONS:
      return {
        ...state,
        locationList: action.payload,
        loading: false,
      };

    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(
          (interest) => interest.id !== action.payload
        ),
      };
    case SAVE_LOCATION:
      return {
        ...state,
        locations: [[...state.locations], action.payload],
      };
    case CLEAR_LOCATIONS:
      return {
        ...state,
        locations: [],
      };
    case SET_INTEREST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_LOCATION_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ERRORS:
      console.error(action.payload);
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
