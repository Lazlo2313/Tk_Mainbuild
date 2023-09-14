'use client'
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('danger');

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setMessage('Login successful!');
        setMessageType('success');
        router.push('/dashboard');
      })
      .catch((error) => {
        setMessage('You not a legitimate leader');
        setMessageType('danger');
      });
  }

  const handleInputChange = () => {
    setMessage('');
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mt-20 container ml-60">
      {message && <div className={`mb-4 py-2 px-4 rounded ${messageType === 'success' ? 'bg-tkgreen' : 'bg-red-500'}`}>
        <p className="text-white">{message}</p>
      </div>}
      <img className='text-center' src='https://toykingdom.co.za/wp-content/uploads/2022/05/Toy-Kingdom-Logo.png' alt='logo' width={400} height={50}/>
      
      <div className="mb-4 mt-4">
        <label htmlFor="email" className="block mb-2 text-gray-800">Email address</label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Enter email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            handleInputChange();
          }}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block mb-2 text-gray-800">Password</label>
        <input
          type="password"
          id="password"
          className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleInputChange();
          }}
          required
        />
      </div>

      <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900,">
        Login
      </button>
    </form>
  );
}

export default Login;
