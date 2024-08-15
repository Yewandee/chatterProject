import React from 'react';
import { Link } from 'react-router-dom';
import'./404.css';

const NotFound: React.FC = () => {
  return (
    <div className='container '>
      <h1 className='title'>404</h1>
      <p className='message'>Page Not Found</p>
      <Link to="/" className='link'>Go back to Home</Link>
    </div>
  );
};


export default NotFound;
