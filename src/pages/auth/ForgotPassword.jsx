import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../config/firebase-config';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = () => {
    try {
      sendPasswordResetEmail(auth, email)
      setMessage('Password reset email sent. Check your inbox.')
    }catch{(error) => {
      if(error.code === 'auth/missing-email') setMessage("Enter Email Address First!")
      else console.log(error)
    }};
  };

  return (
    <div className='h-full font-poppins flex flex-col items-center mt-[5rem] gap-7 bg-off-white'>
      <h2 className='text-xl font-semibold'>Forgot your password?</h2>
      <div className="flex flex-col gap-3 items-center">
      <input
        type="email"
        placeholder="Enter your email"
        className='inp'
        id='inp'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className='bg-primary-400 text-white px-4 py-2 rounded-xl hover:bg-primary-500' onClick={handleResetPassword} id='reset-btn'>Reset Password</button>
      <Link className='text-primary-500 hover:underline' rel="stylesheet" to="/login">Cancel</Link>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;
