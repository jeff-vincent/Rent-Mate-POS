import React, {FC, Component} from 'react';
import { makeStyles } from '@material-ui/styles';
import {Elements, injectStripe, CardElement, ReactStripeElements} from 'react-stripe-elements';
import CardSection from './CardSection';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  });

interface Props{
    elements: any, 
    stripe: ReactStripeElements.StripeProps
}  

class Checkout extends Component{
    handleSubmit = (ev: any) => {
      // We don't want to let default form submission happen here, which would refresh the page.
      ev.preventDefault();
  
      // Use Elements to get a reference to the Card Element mounted somewhere
      // in your <Elements> tree. Elements will know how to find your Card Element
      // because only one is allowed.
      // See our getElement documentation for more:
      // https://stripe.com/docs/stripe-js/reference#elements-get-element
      const cardElement = this.props.elements.getElement('card');
  
      // From here we can call createPaymentMethod to create a PaymentMethod
      // See our createPaymentMethod documentation for more:
      // https://stripe.com/docs/stripe-js/reference#stripe-create-payment-method
      this.props.stripe
        .createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: {name: 'Jenny Rosen'},
        })
        .then(({paymentMethod}) => {
          console.log('Received Stripe PaymentMethod:', paymentMethod);
        });
  
      // You can also use confirmCardPayment with the PaymentIntents API automatic confirmation flow.
      // See our confirmCardPayment documentation for more:
      // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-payment
      this.props.stripe.confirmCardPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
        payment_method: {
          card: cardElement,
        },
      });
  
      // You can also use confirmCardSetup with the SetupIntents API.
      // See our confirmCardSetup documentation for more:
      // https://stripe.com/docs/stripe-js/reference#stripe-confirm-card-setup
      this.props.stripe.confirmCardSetup('{PAYMENT_INTENT_CLIENT_SECRET}', {
        payment_method: {
          card: cardElement,
        },
      });
  
      // You can also use createToken to create tokens.
      // See our tokens documentation for more:
      // https://stripe.com/docs/stripe-js/reference#stripe-create-token
      // With createToken, you will not need to pass in the reference to
      // the Element. It will be inferred automatically.
      this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
      // token type can optionally be inferred if there is only one Element
      // with which to create tokens
      // this.props.stripe.createToken({name: 'Jenny Rosen'});
  
      // You can also use createSource to create Sources.
      // See our Sources documentation for more:
      // https://stripe.com/docs/stripe-js/reference#stripe-create-source
      // With createSource, you will not need to pass in the reference to
      // the Element. It will be inferred automatically.
      this.props.stripe.createSource({
        type: 'card',
        owner: {
          name: 'Jenny Rosen',
        },
      });
    };
  
    render() {
      return (
        <Elements>
          <form onSubmit={this.handleSubmit}>
            <CardSection />
            <button>Confirm order</button>
          </form>
        </Elements>
      );
    }
  }


export default injectStripe(Checkout);