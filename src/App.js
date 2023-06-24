import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../src/assets/styles/App.css';
import ProductList from './components/product/ProductList';
import GestionStock from "./components/stock/GestionStock";
import UserAccount from "./components/user/account";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserAccount />} />
                <Route path="/gestionStock" element={<GestionStock />} />
                <Route path="/productList" element={<ProductList />} />
            </Routes>
        </Router>
    );
}

export default App;
