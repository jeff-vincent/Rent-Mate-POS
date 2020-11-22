import React from 'react';
import {render} from 'react-dom';
import {StripeProvider} from 'react-stripe-elements';

import MyStoreCheckout from './components/Checkout/MyStoreCheckout';

const App = () => {
  return (
    <StripeProvider apiKey="pk_test_12345">
      <MyStoreCheckout />
    </StripeProvider>
  );
};

export default App;
