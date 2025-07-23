import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div>
     
    <footer className='footer'>
        Privacy Policy    |   Terms and Conditions    |   Cookies  <br /> <br />
        &copy; Daffodils{new Date().getFullYear()} 
             
    </footer>
    </div>
  )
}

export default Footer;
