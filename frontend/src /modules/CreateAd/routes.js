import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import CreateAdMainPage from "./pages";
import CreateCampaignContainer from "./containers/CreateCampaignContainer";
import ConnectSocialContainer from "./containers/ConnectSocialContainer";
import TargetingContainer from "./containers/TargetingContainer";
import BudgetContainer from "./containers/BudgetContainer";
import FacebookAdContainer from "./containers/FacebookAdContainer";
import FacebookFeedContainer from "./containers/FacebookFeedContainer";
import GoogleAdContainer from "./containers/GoogleAdContainer";
import SummaryContainer from "./containers/SummaryContainer";

const CreateAdRoutes = () => {
  return (
    <Switch>
      <Route exact path="/create/summary" component={SummaryContainer} />
      <Route exact path="/create/google" component={GoogleAdContainer} />
      <Route exact path="/create/facebook-ad" component={FacebookAdContainer} />
      <Route
        exact
        path="/create/facebook-feed"
        component={FacebookFeedContainer}
      />
      <Route exact path="/create/budget" component={BudgetContainer} />
      <Route exact path="/create/targeting" component={TargetingContainer} />
      <Route
        exact
        path="/create/connect-social"
        component={ConnectSocialContainer}
      />
      <Route
        exact
        path="/create/create-campaign"
        component={CreateCampaignContainer}
      />
      <Route exact path="/create" component={CreateCampaignContainer} />
    </Switch>
  );
};

export default CreateAdRoutes;
