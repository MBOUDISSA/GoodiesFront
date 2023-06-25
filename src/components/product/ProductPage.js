import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../assets/styles/ProductPage.css';

function ProductPage() {
    const { productName } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3000/products/${encodeURIComponent(productName)}`);
                if (response.ok) {
                    const data = await response.json();
                    setProduct(data);
                } else {
                    throw new Error('Erreur lors de la récupération du produit');
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du produit :', error);
                setError(error.message);
            }
        };

        fetchProduct();
    }, [productName]);

    const handleBuyButtonClick = () => {
        console.log('Achat du produit :', product);
    };

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        if (newQuantity>0 && newQuantity <= product.quantityReel - product.quantityReserve) {
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
