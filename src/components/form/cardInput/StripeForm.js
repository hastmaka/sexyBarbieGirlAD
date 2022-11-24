import React from 'react';
import {PaymentElement} from '@stripe/react-stripe-js';

export const StripeForm = () => {
    return (
        <form>
            <PaymentElement />
            <button>Submit</button>
        </form>
    );
};