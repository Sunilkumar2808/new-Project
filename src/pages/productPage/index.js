// src/pages/ProductPage.js
import React, { useState } from 'react';
import ProductList from '../../components/ProductList';

const ProductPage = () => {
    const [category, setCategory] = useState('all'); 

    return (
        <div>
            <h1>Product List</h1>
            <select onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="men's clothing">Clothing</option>
                <option value="women's clothing">Women's Clothing</option>
                <option value="jewelery">Jewelry</option>
            </select>
            <ProductList category={category} />
        </div>
    );
};

export default ProductPage;
