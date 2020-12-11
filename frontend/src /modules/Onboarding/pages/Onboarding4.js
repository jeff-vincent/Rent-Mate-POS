import React from "react";

import OnboardingPageWrapper from "../components/OnboardingPageWrapper";
import GoalsForm from "../components/GoalsForm";

const Onboarding4 = () => {
  return (
    <OnboardingPageWrapper
      header="Basic Info"
      content="basic info information para"
    >
      <GoalsForm />
    </OnboardingPageWrapper>
  );
};

export default Onboarding4;
