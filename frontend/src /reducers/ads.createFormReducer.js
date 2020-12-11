import {
  UPDATE_SOCIALS,
  UPDATE_TARGETS,
  UPDATE_BUDGET,
} from "../actions/types";

// Set Facebook feed ad state
const defaultValues = {
  socialsToPost: [],
  targetingInfo: {},
  budgetInfo: {},
};

export default (state = defaultValues, action) => {
  switch (action.type) {
    case UPDATE_SOCIALS:
      return {
        ...state,
        socialsToPost: action.payload,
      };
    case UPDATE_TARGETS: {
      return {
        ...state,
        targetingInfo: action.payload,
      };
    }
    case UPDATE_BUDGET: {
      return {
        ...state,
        budgetInfo: action.payload,
      };
    }
    default:
      return state;
  }
};
