import React, { useEffect, useState } from 'react'
import './AllProducts.css'
import { getAllProducts } from '../../../ApiService/ApiService'
import { Link } from 'react-router-dom';

function AllProducts() {
    const[products,setProducts]= useState([])
    useEffect(() => {
    const fetchProducts= async ()=>{
        const data =await getAllProducts()
        setProducts(data);
    }
    fetchProducts();

    }, []);
  return (
    <div className='product-grid'>
        {

            products.map((product)=>(

        <div  className='product' key={product.id}>
        <img src= {product.image} alt="alternative" />
        <h2>{product.name}</h2>
        <p>
        <span className='price'>${product.newPrice}</span>
        </p>
        <Link to={`/product/${product.id}`}>
        <button>Product Details</button>
        </Link>
       
    </div>
  

            ))
        }


    </div>
  )
}

export default AllProducts;
