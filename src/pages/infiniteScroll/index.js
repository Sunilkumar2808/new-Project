import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../../components/ProductCard';


const Scroll = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 5;

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data); // Set all products to state
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch all products once when the component mounts
  }, []);

  // Load more products on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Check if user is near the bottom of the page
      const isBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50;

      if (isBottom && !loading) {
        loadMoreProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  // Function to load more products
  const loadMoreProducts = () => {
    if (page * limit < products.length) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }
  };

  // Get the products for the current page
  const currentProducts = products.slice(0, page * limit);

  return (
    <div>
      <h1 className='text-center'>Infinite Scroll</h1>
      <div className="product-list px-4 row">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
};

export default Scroll;