import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './search.css';

function Search() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('http://localhost:5000/products');
      const filtered = res.data.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    };

    if (query) {
      fetchProducts();
    }
  }, [query]);

  return (
    <div className="search-results">
      <h2>Search Results for: "{query}"</h2>
      {results.length > 0 ? (
        <ul className="results-list">
          {results.map(item => (
            <li key={item.id}>
              <img src={item.image} alt={item.name} width={100} />
              <h4>{item.name}</h4>
              <p>{item.brand}</p>
              <p>${item.newPrice}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}

export default Search;
