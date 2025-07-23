import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import { getProductId } from '../../../ApiService/ApiService';

function ProductDetails() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      const data = await getProductId(id);
      setProductDetails(data);
    };
    fetchProductDetails();
  }, [id]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToCart = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login to add items to the cart.");
      navigate("/login");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size before adding to the cart.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = cart.findIndex(
      item => item.id === productDetails.id && item.size === selectedSize
    );

    if (existingProductIndex >= 0) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...productDetails, quantity: 1, size: selectedSize });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    navigate("/cart");
  };

  if (!productDetails) return <p>Loading...</p>;

  const availableSizes = ['6', '7', '8', '9', '10', '11'];

  return (
    <div className='product-details-container'>
      <img src={productDetails.image} alt="image" className='product-image' />
      <div className='product-info'>
        <h2 className='product-title'>{productDetails.name}</h2>
        <p className='product-description'>{productDetails.description}</p>

        <div className='price-section'>
          <span className='actual-price'>${productDetails.oldPrice}</span>
          <span className='discount-price'>${productDetails.newPrice}</span>
          <span className='discount-tag'>Save {Math.round(((productDetails.oldPrice - productDetails.newPrice) / productDetails.oldPrice) * 100)}%</span>
        </div>

        {/* Size Selector */}
        <div className='size-selector'>
          <p>Select Size:</p>
          {availableSizes.map((size) => (
            <button
              key={size}
              className={`size-button ${selectedSize === size ? 'selected' : ''}`}
              onClick={() => handleSizeSelect(size)}
            >
              {size}
            </button>
          ))}
        </div>

        <button className='add-to-cart' onClick={handleAddToCart}>Add to Cart</button>

        <Link to="/">
          <button className='go-back-home'>Go Back Home</button>
        </Link>
      </div>
    </div>
  );
}

export default ProductDetails;