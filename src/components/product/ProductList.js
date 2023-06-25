import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/App.css';
import '../../assets/styles/ProductList.css';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des produits :', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="product-list">
            <h1>Boutique</h1>
            <div className="card-container">
                {products.map((product) => (
                    <Link key={product.name} to={`/product/${encodeURIComponent(product.name)}`} className="product-card">
                        <img src={`data:image/jpeg;base64,${product.picture}`} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <h2 className="product-title">{product.name}</h2>
                            <p>{product.description}</p>
                            <p>Prix : {product.price}</p>
                            <p>Catégorie : {product.category}</p>
                            <button>Voir plus</button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
