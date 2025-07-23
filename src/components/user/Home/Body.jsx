import React from 'react'
import bodyb from '../../../assets/bodyb.jpg';
import './Body.css'
import man from '../../../assets/man.jpg';
import women from '../../../assets/women.jfif';
import Limited from '../../../assets/Limited.jfif';

import { Link } from 'react-router-dom';
import kids from '../../../assets/kids.jfif';


function Body() {
  return (
    <div className="image-container">
      <img src={bodyb} alt="image" className='body-one' />
      <h1><center>Shop by collection</center></h1>
      <div className='parent'>
        <Link to="/menproducts" >
        <h2><center>Men</center></h2>
        <img src={man} alt="image" className="man"/>
        </Link>
        <Link to="/womenproducts">
        <h2><center>Women</center></h2>
        <img src={women} alt="image" className="women"/>
        </Link>
        <Link  to ="kidsproducts">
        <h2><center>Kids</center></h2>
        <img src={kids} alt="image" className="trending"/>
        </Link>
        <Link to="allproducts">
        <h2><center>All Products</center></h2>
        <img src={Limited} alt="image" className="Limited"/>
        </Link>

      </div> 
      </div>
    
  );
}

export default Body;
