import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate(); // Now correctly used within the context of a Router

  return (
    <div className='login-and-signup'>
      <button className='login' onClick={() => navigate('/client')}>Client View</button>
      <button className='signup' onClick={() => navigate('/translator')}>Freelancer View</button>
    </div>
  );
}

export default Navigation;
