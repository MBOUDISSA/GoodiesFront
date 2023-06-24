import React, { useState, useEffect } from 'react';
import '../../assets/styles/App.css';

function GestionStock() {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [stock, setStock] = useState(null);
    const [quantiteAjoutee, setQuantiteAjoutee] = useState('');
    const [reelOrReserve, setReelOrReserve] = useState('reel');

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
    }, []);

    const handleProductChange = event => {
        setSelectedProduct(event.target.value);
    };

    useEffect(() => {
        if (selectedProduct) {
            fetch(`http://localhost:3000/stock/${selectedProduct}`)
                .then(response => response.json())
                .then(data => setStock(data))
                .catch(error => console.error(error));
        }
    }, [selectedProduct]);

    const handleQuantiteAjouteeChange = event => {
        setQuantiteAjoutee(event.target.value);
    };

    const handleReelOrReserveChange = event => {
        setReelOrReserve(event.target.value === 'reel' ? true : false);
    };


    const handleAjouterAuStock = () => {
        if (selectedProduct && quantiteAjoutee !== '') {
            const typeStock = reelOrReserve ? 'reel' : 'reserve';

            if (!reelOrReserve && quantiteAjoutee > stock.quantityReel - stock.quantityReserve) {
                alert("La quantité de stock réservé ne peut pas dépasser la quantité réelle");
                return;
            }

            fetch('http://localhost:3000/stock/ajouter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nomProduit: selectedProduct,
                    quantiteAjoutee: parseFloat(quantiteAjoutee),
                    reelOrReserve: typeStock,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    setStock(prevStock => ({
                        ...prevStock,
                        [typeStock === 'reel' ? 'quantityReel' : 'quantityReserve']: data.stockModifie,
                    }));
                    setQuantiteAjoutee('');
                })
                .catch(error => console.error(error));
        }
    };




    return (
        <div>
            <h2>Gestion du stock</h2>
            <label>
                Produit:
                <select value={selectedProduct} onChange={handleProductChange}>
                    <option value="">Sélectionnez un produit</option>
                    {products.map(product => (
                        <option key={product.id} value={product.name}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </label>
            <br />

            {stock ? (
                <div>
                    <h3>Stock du produit: {stock.name}</h3>
                    <p>Quantité réelle: {stock.quantityReel}</p>
                    <p>Quantité réservée: {stock.quantityReserve}</p>
                </div>
            ) : (
                <p>Sélectionnez un produit pour afficher le stock.</p>
            )}

            {selectedProduct && (
                <div>
                    <h3>Ajouter au stock</h3>
                    <label>
                        Quantité ajoutée:
                        <input type="number" value={quantiteAjoutee} onChange={handleQuantiteAjouteeChange} />
                    </label>
                    <br />
                    <label>
                        Type de stock:
                        <input
                            type="radio"
                            name="stockType"
                            value="reel"
                            checked={reelOrReserve}
                            onChange={handleReelOrReserveChange}
                        />
                        Réel
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="stockType"
                            value="reserve"
                            checked={!reelOrReserve}
                            onChange={handleReelOrReserveChange}
                        />
                        Réservé
                    </label>
                    <br />
                    <button onClick={handleAjouterAuStock}>Ajouter au stock</button>
                </div>
            )}
        </div>
    );
}

export default GestionStock;
