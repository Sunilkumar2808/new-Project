import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 5; 

  const fetchProducts = async () => {
    setLoading(true);
    try {

      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data); 
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); 
  }, []);

  const totalPages = Math.ceil(products.length / limit);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const currentProducts = products.slice((page - 1) * limit, page * limit);

  return (
    <div>
    <h1 className='text-center'>Product List Pagination</h1>
      <div className="product-list px-4 row">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {loading && <p>Loading...</p>}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePreviousPage} disabled={page === 1 || loading}>
              Previous
            </button>
          </li>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <li key={pageNum} className={`page-item ${page === pageNum ? 'active' : ''}`}>
              <button className="page-link" onClick={() => setPage(pageNum)} disabled={loading}>
                {pageNum}
              </button>
            </li>
          ))}

          <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handleNextPage} disabled={page === totalPages || loading}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default ProductList;