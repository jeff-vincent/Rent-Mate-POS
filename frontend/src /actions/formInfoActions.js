import { UPDATE_SOCIALS, UPDATE_TARGETS, UPDATE_BUDGET } from "./types";

export const updateSocials = (payload) => {
  return {
    type: UPDATE_SOCIALS,
    payload,
  };
};

export const updateTargetInfo = (payload) => {
  return {
    type: UPDATE_TARGETS,
    payload,
  };
};

export const updateBudgetInfo = (payload) => {
  return {
    type: UPDATE_BUDGET,
    payload,
  };
};