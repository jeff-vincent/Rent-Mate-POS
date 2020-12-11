import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import Sidebar from "../modules/Navbar/components/Sidebar";
import HomePage from "../modules/Home/pages/HomePage";
import LoggedInNav from "../modules/Navbar/components/LoggedInNav";
import CreateAdRoutes from "../modules/CreateAd/routes";
import DashboardRoutes from "../modules/Dashboard/routes";
import AnalyticsRoutes from "../modules/Analytics/routes";
import ProfileRoutes from "../modules/Profile/routes";
import OnboardingRoutes from "../modules/Onboarding/routes";

const AuthenticatedRoutes = ({ isAuthenticated }) => {
  return (
    <>
      {isAuthenticated && (
        <Router>
          <Box height="100%" minHeight="100vh">
            <Route path="/" component={LoggedInNav} />
            <Sidebar>
              <OnboardingRoutes />
              <CreateAdRoutes />
              <DashboardRoutes />
              <AnalyticsRoutes />
              <ProfileRoutes />
            </Sidebar>
          </Box>
        </Router>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(AuthenticatedRoutes);
