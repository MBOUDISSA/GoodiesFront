import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';
import '../../assets/styles/ProductPage.css';

const stripePromise = loadStripe('pk_test_51NP5c9DiixA1W26b9j4CYmWLMKW7C5HrwdBkeW7fOlwLP56zbdm45cfBu1qg49WukRdlF3IqSw8QV3KXnEfxrsVl00VMCUx33b');

function ProductPage() {
    const { name } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        console.log('useEffect - fetchProduct');

        const fetchProduct = async () => {
            try {
                if (!name) {
                    return;
                }
                console.log('URL appelée :', `http://localhost:3000/products/${encodeURIComponent(name)}`);
                const response = await fetch(`http://localhost:3000/products/${encodeURIComponent(name)}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log('data:', data);
                    setProduct(data);
                    console.log('product:', data);
                } else {
                    throw new Error('Erreur lors de la récupération du produit');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du produit :', error);
                setError(error.message);
            }
        };
        fetchProduct();
    }, [name]);


    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                if (!product) {
                    return;
                }
                const response = await fetch('http://localhost:3000/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ items: [{ id: product._id }] }),
                });
                if (response.ok) {
                    const data = await response.json();
                    setClientSecret(data.clientSecret);
                } else {
                    throw new Error('Erreur lors de la création de l\'intention de paiement');
                }
            } catch (error) {
                console.error('Erreur lors de la création de l\'intention de paiement :', error);
                setError(error.message);
            }
        };
        createPaymentIntent();
    }, [product]);

    const handleBuyButtonClick = async () => {
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId: clientSecret.clientSecret, // Correction ici
        });
        if (error) {
            console.error(error.message);
        }
    };

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (newQuantity > 0 && newQuantity <= product.quantityReel - product.quantityReserve) {
            setQuantity(newQuantity);
        }
    };

    if (error) {
        return <div>Erreur : {error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    const getQuantityColorClass = (quantity) => {
        if (quantity > 100) {
            return 'quantity-green';
        } else if (quantity > 50) {
            return 'quantity-orange';
        } else {
            return 'quantity-red';
        }
    };

    return (
        <div className="product-page">
            <div className="product-container-shop">
                <img src={`data:image/jpeg;base64,${product.picture}`} alt={product.name} className="product-picture-shop" />
                <div className="product-details-shop">
                    <h1>{product.name}</h1>
                    <div>
                        <label htmlFor="quantity">Quantité:</label>
                        <input type="number" id="quantity" name="quantity" min="1" value={quantity} onChange={handleQuantityChange} />
                    </div>
                    <div className="price-shop">
                        <span className="label">Prix:</span> {parseFloat(product.price) * quantity} €
                    </div>
                    <div>
                        <button className="buy-button-shop" onClick={handleBuyButtonClick}>
                            Acheter
                        </button>
                    </div>
                    <div className="status-shop">
                        <span className="label">Status:</span> {product.status}
                    </div>
                    <div className={`quantity-shop ${getQuantityColorClass(product.quantityReel - product.quantityReserve)}`}>
                        <span className="label">Quantité disponible:</span> {product.quantityReel - product.quantityReserve}
                    </div>
                    <div className="description-shop">
                        <span className="label">Description:</span> {product.description}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
