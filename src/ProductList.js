import React, { useState, useEffect } from 'react';
import './App.css';

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
        <div>
            <h1>Liste des produits</h1>
            <table>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Statut</th>
                    <th>Quantité</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Prix</th>
                    <th>Catégorie</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.name}</td>
                        <td>{product.status}</td>
                        <td>{product.quantity}</td>
                        <td>{product.description}</td>
                        <td>
                            <img src={product.picture} alt={product.name} width="50" height="50" />
                        </td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductList;
