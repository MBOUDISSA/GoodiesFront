import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../src/assets/styles/App.css';
import ProductList from './components/product/ProductList';
import GestionStock from "./components/stock/GestionStock";
import CreateUserForm from "./components/user/account";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CreateUserForm />} />
                <Route path="/gestionStock" element={<GestionStock />} />
                <Route path="/productList" element={<ProductList />} />
            </Routes>
        </Router>
    );
}

export default App;
