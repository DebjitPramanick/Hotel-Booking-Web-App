import React, { useMemo } from 'react'
import { loadStripe } from '@stripe/stripe-js';
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement
} from "@stripe/react-stripe-js";
import useResponsiveFontSize from "./responsiveFonts";
import { FormButton } from '../GlobalStyles/PageStyles';
import styled from 'styled-components'

const CardInputWrapper = styled.div`
    border: 1px solid #b6b6b6;
    outline: 0;
    font-size: 16px;
    padding: 10px 12px;
    border-radius: 4px;
    margin: 10px 0 16px;
`;

const useOptions = () => {
    const fontSize = useResponsiveFontSize();
    const options = useMemo(
        () => ({
            style: {
                base: {
                    fontSize,
                    color: "#424770",
                    letterSpacing: "0.025em",
                    fontFamily: "Source Code Pro, monospace",
                    "::placeholder": {
                        color: "#aab7c4"
                    }
                },
                invalid: {
                    color: "#9e2146"
                }
            }
        }),
        [fontSize]
    );

    return options;
};


const StripeForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const options = useOptions();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        const payload = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement)
        });
    };


    return (
        <form onSubmit={handleSubmit}>
            <label>
                Card number
                <CardInputWrapper>
                    <CardNumberElement
                        options={options}
                        onChange={event => {
                        }}
                    />
                </CardInputWrapper>
            </label>
            <label>
                Expiration date
                <CardInputWrapper>
                    <CardExpiryElement
                        options={options}
                        onChange={event => {
                        }}
                    />
                </CardInputWrapper>
            </label>
            <label>
                CVC
                <CardInputWrapper>
                    <CardCvcElement
                        options={options}
                        onChange={event => {
                        }}
                    />
                </CardInputWrapper>
            </label>
            <FormButton style={{ width: '100%', borderRadius: '4px', marginTop: '16px' }}
                type="submit" disabled={!stripe || !elements}>
                Pay
            </FormButton>
        </form>
    )
}

export default StripeForm
