import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

// import { useNavigate } from 'react-router-dom';
import { Context } from '../context/ContextProvider';


const RegistrationForm = () => {
  const server = 'https://quiz-v2.onrender.com'

  const {
    isLogin,
   } = React.useContext(Context);
  // const navigate = useNavigate();
  const history = useNavigate()
  // State variables for input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Name:', name, 'Email:', email, 'Password:', password);
      // Make POST request using Axios
      const response = await axios.post(`${server}/register`, {
        name,
        email,
        password
      });
      console.log(response.data);
      if (response.data ==1) {
        alert('User with this email already exists')
      }
      else{
        
        alert("Registration Successful");
        // navigate('/login');
        history('/login')

        console.log('Registration successful:', response.data);
      }
        
      // Reset input values after successful registration
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      alert(error);
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email address"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
