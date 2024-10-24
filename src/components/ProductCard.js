import React from 'react';


const ProductCard = ({ product }) => {
  return (

    <div className="card m-5 m-sm-2 p-2 col-md-4 col-lg-3" style={{ minHeight: '550px' }}>
      <div className='d-flex justify-content-center align-items-center'><img src={product.image} className="card-img-top w-75" style={{ height: '250px' }} alt={product.title} /></div>
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">Price: ${product.price}</p>
        <p className="card-text" style={{ height: "150px", overflowY: 'scroll', overflowX: 'hidden', textAlign: 'start' }}>{product.description}</p>
        <button className="btn btn-primary" style={{ position: 'absolute', bottom: "7px", right: '40%' }}>View Details</button>
      </div>
    </div>

  );
};

export default ProductCard;
