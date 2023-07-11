import React, { useEffect, useState } from 'react';
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState(null); // Déclaration et initialisation de clientSecret

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret');

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case 'succeeded':
                    setMessage('Paiement réussi !');
                    break;
                case 'processing':
                    setMessage('Votre paiement est en cours de traitement.');
                    break;
                case 'requires_payment_method':
                    setMessage("Votre paiement n'a pas abouti, veuillez réessayer.");
                    break;
                default:
                    setMessage('Une erreur s\'est produite.');
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js n'est pas encore chargé.
            // Assurez-vous de désactiver la soumission du formulaire tant que Stripe.js n'est pas chargé.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: email,
                },
            },
        });

        if (error) {
            setMessage(error.message);
        } else {
            setMessage('Paiement réussi !');
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        style: {
            base: {
                color: '#32325d',
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                    color: '#32325d',
                },
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <div id="card-element" options={paymentElementOptions} />
            <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner" /> : 'Payer maintenant'}
        </span>
            </button>
            {/* Afficher les messages d'erreur ou de réussite */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}
