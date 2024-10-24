import React from 'react';
import ProductList from './components/ProductList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Stepper from "./pages/stepper";
import Scroll from "./pages/infiniteScroll";
import Navbar from './pages/navbar'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import './App.css'; 
const App = () => {
  return (
    <Router>
    <Navbar />
    <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/Stepper" element={<Stepper />} />
        <Route path="/Scroll" element={<Scroll />} />
    </Routes>
</Router>
  );
};

export default App;
