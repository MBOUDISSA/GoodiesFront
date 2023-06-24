import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import './App.css';
import GestionStock from "./GestionStock";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/gestionStock" element={<GestionStock />} />
                <Route path="/" element={<ProductList />} />
            </Routes>
        </Router>
    );
}

export default App;
