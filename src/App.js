import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../src/assets/styles/App.css';
import ProductList from './components/product/ProductList';
import GestionStock from "./components/stock/GestionStock";
import CreateUserForm from "./components/user/account";
import ProductPage from "./components/product/ProductPage";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CreateUserForm />} />
                <Route path="/gestionStock" element={<GestionStock />} />
                <Route path="/shop" element={<ProductList />} />
                <Route path="/product/:name" element={<ProductPage />}/>
            </Routes>
        </Router>
    );
}

export default App;
