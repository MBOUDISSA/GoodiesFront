import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../src/assets/styles/App.css';
import ProductList from './components/product/ProductList';
import GestionStock from "./components/stock/GestionStock";
import UserAccount from "./components/user/account";
import ProductPage from "./components/product/ProductPage";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserAccount />} />
                <Route path="/gestionStock" element={<GestionStock />} />
                <Route path="/shop" element={<ProductList />} />
                <Route path="/product/:productName" element={<ProductPage />}/>
            </Routes>
        </Router>
    );
}

export default App;
