import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Onboarding1 from "./pages/Onboarding1";
import Onboarding2 from "./pages/Onboarding2";
// import Onboarding3 from "./pages/Onboarding3";
// import Onboarding4 from "./pages/Onboarding4";
import OnboardingCompleted from "./pages/OnboardingCompleted";

const OnboardingRoutes = () => {
  return (
    <>
      <Route path="/onboarding/1" component={Onboarding1} />
      <Route path="/onboarding/2" component={Onboarding2} />
      {/* <Route path="/onboarding/3" component={Onboarding3} />
      <Route path="/onboarding/4" component={Onboarding4} /> */}
      <Route path="/onboarding/3" component={OnboardingCompleted} />
    </>
  );
};

export default OnboardingRoutes;
