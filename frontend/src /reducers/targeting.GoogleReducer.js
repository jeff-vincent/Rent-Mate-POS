import {
  SET_GOOGLE_KEYWORDS,
  GET_GOOGLE_KEYWORDS,
  DELETE_GOOGLE_KEYWORD,
  SAVE_GOOGLE_KEYWORD,
  CLEAR_GOOGLE_KEYWORDS,
  SET_GOOGLE_INTERESTS,
  GET_GOOGLE_INTERESTS,
  DELETE_GOOGLE_INTEREST,
  SAVE_GOOGLE_INTEREST,
  CLEAR_GOOGLE_INTERESTS,
  SET_GOOGLE_LOCATIONS,
  GET_GOOGLE_LOCATIONS,
  DELETE_GOOGLE_LOCATION,
  SAVE_GOOGLE_LOCATION,
  CLEAR_GOOGLE_LOCATIONS,
  SET_GOOGLE_KEYWORD_LOADING,
  SET_GOOGLE_INTEREST_LOADING,
  SET_GOOGLE_LOCATION_LOADING,
  GET_ERRORS,
  ADD_KEYWORD_TO_PLAN,
  DELETE_KEYWORD_FROM_PLAN,
} from "../actions/types";

// Set Google targeting state
const initialState = {
  interests: null,
  interestList: null,
  keywords: null,
  keywordList: null,
  keywordPlan: [],
  locations: null,
  locationList: null,
  current: null,
  keywordLoading: false,
  interestLoading: false,
  locationLoading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_GOOGLE_KEYWORDS:
      return {
        ...state,
        keywords: action.payload,
        loading: false,
      };

    case SET_GOOGLE_KEYWORDS:
      return {
        ...state,
        keywordList: action.payload,
        loading: false,
      };

    case DELETE_GOOGLE_KEYWORD:
      return {
        ...state,
        keywords: state.keywords.filter(
          (keyword) => keyword.id !== action.payload
        ),
      };
    case SAVE_GOOGLE_KEYWORD:
      return {
        ...state,
        keywords: [...state.keywords, action.payload],
      };
    case CLEAR_GOOGLE_KEYWORDS:
      return {
        ...state,
        keywords: [],
      };
    case ADD_KEYWORD_TO_PLAN:
      return {
        ...state,
        keywordPlan: [...state.keywordPlan, action.payload],
      };

    case DELETE_KEYWORD_FROM_PLAN:
      return {
        ...state,
        keywordPlan: state.keywordPlan.filter(
          (keyword) => keyword.id !== action.payload
        ),
      };
    case GET_GOOGLE_INTERESTS:
      return {
        ...state,
        interests: action.payload,
        loading: false,
      };

    case SET_GOOGLE_INTERESTS:
      return {
        ...state,
        interestList: action.payload,
        loading: false,
      };

    case DELETE_GOOGLE_INTEREST:
      return {
        ...state,
        interests: state.interests.filter(
          (interest) => interest.id !== action.payload
        ),
      };
    case SAVE_GOOGLE_INTEREST:
      return {
        ...state,
        interests: [[...state.interests], action.payload],
      };
    case CLEAR_GOOGLE_INTERESTS:
      return {
        ...state,
        interests: [],
      };
    case GET_GOOGLE_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
        loading: false,
      };

    case SET_GOOGLE_LOCATIONS:
      return {
        ...state,
        locationList: action.payload,
        loading: false,
      };

    case DELETE_GOOGLE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(
          (interest) => interest.id !== action.payload
        ),
      };
    case SAVE_GOOGLE_LOCATION:
      return {
        ...state,
        locations: [[...state.locations], action.payload],
      };
    case CLEAR_GOOGLE_LOCATIONS:
      return {
        ...state,
        locations: [],
      };
    case SET_GOOGLE_KEYWORD_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_GOOGLE_INTEREST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_GOOGLE_LOCATION_LOADING:
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
