import React, { useEffect, useState } from 'react';
import './WomenProducts.css';
import { getAllProducts } from '../../../ApiService/ApiService';
import { Link } from 'react-router-dom';

function WomenProducts() {
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    const fetchWomenProducts = async () => {
      const allProducts = await getAllProducts();
      const filtered = allProducts.filter(
        (product) => product.category.toLowerCase() === 'women'
      );
      setWomenProducts(filtered);
    };

    fetchWomenProducts();
  }, []);

  return (
    <div className="product-grid">
      {womenProducts.map((product) => (
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

export default WomenProducts;