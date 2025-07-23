import React, { useState } from 'react';
import axios from 'axios';
import './Registration.css'

function Register() {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`http://localhost:5000/users?username=${username}`);
      if (res.data.length > 0) {
        alert('User already exists');
      } else {
        await axios.post('http://localhost:5000/users', {
          firstName,
          secondName,
          email,
          mobile,
          username,
          password,
        });
        alert('Registration successful');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong during registration.');
    }
  };

  return (
    <div className='register'>
    <form onSubmit={handleRegister}>
      <h2><center>Register</center></h2><br /><br/>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required className='text-one'
      /><br /><br />
      <input
        type="text"
        value={secondName}
        onChange={(e) => setSecondName(e.target.value)}
        placeholder="Second Name"
        required className='text-one'
      /><br /><br />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        required className='text-one'
      /><br /><br />
      <input
        type="tel"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Mobile Number"
        pattern="[0-9]{10}"
        required  className='text-one'
      /><br /><br />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required className='text-one'
      /><br /><br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required  className='text-one'
      /><br /><br />
      <button type="submit" className='button-register'>Register</button>
    </form>
    </div>
  );
}

export default Register;