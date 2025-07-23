import React, { useEffect, useState } from 'react';
import './KidsProducts.css';
import { getAllProducts } from '../../../ApiService/ApiService';
import { Link } from 'react-router-dom';

function KidsProducts() {
  const [kidsProducts, setKidsProducts] = useState([]);

  useEffect(() => {
    const fetchKidsProducts = async () => {
      const allProducts = await getAllProducts();
      const filtered = allProducts.filter(
        (product) => product.category.toLowerCase() === 'kids'
      );
      setKidsProducts(filtered);
    };

    fetchKidsProducts();
  }, []);

  return (
    <div className="product-grid">
      {kidsProducts.map((product) => (
        <div className="product" key={product.id}>
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>
            <span className="price">${product.newPrice}</span>
          </p>
          <Link to={`/product/${product.id}`}>
            <button>Product Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default KidsProducts;