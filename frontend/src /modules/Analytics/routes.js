import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AnalyticsMainPage from "./pages";

const CreateAdRoutes = () => {
  return (
    <Switch>
      <Route path="/analytics" component={AnalyticsMainPage} />
    </Switch>
  );
};

export default CreateAdRoutes;
