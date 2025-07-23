import React, { useEffect, useState } from 'react';
import './MenProducts.css';
import { getAllProducts } from '../../../ApiService/ApiService';
import { Link } from 'react-router-dom';

function MenProducts() {
  const [menProducts, setMenProducts] = useState([]);

  useEffect(() => {
    const fetchMenProducts = async () => {
      const allProducts = await getAllProducts();
      const filtered = allProducts.filter(
        (product) => product.category.toLowerCase() === 'men'
      );
      setMenProducts(filtered);
    };

    fetchMenProducts();
  }, []);

  return (
    <div className="product-grid">
      {menProducts.map((product) => (
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

export default MenProducts;