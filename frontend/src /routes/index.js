import React from "react";
import { Provider } from "react-redux";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, Stripe } from '@stripe/stripe-js';

import "semantic-ui-css/semantic.min.css";
import store from "../store";
import { theme } from "../muiTheme";
import AuthenticatedRoutes from "./Authenticated";
import NonAuthenticatedRoutes from "./NonAuthenticated";

const stripePromise = loadStripe(
  'pk_test_51Ha6lKBytuXQBECgLBUclwvE1dtaEt2coUeUybxjmjdVo6VJ7BL6AAMV13U0OSGN5xWEYxGQQqytoihDiC1egvGq00I5NRoZNd'
)

const Routes = ({ isAuthenticated }) => {
  return (
    <Elements stripe={stripePromise}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AuthenticatedRoutes />
          <NonAuthenticatedRoutes />
        </Provider>
      </ThemeProvider>
    </Elements>
  );
};

export default Routes;
