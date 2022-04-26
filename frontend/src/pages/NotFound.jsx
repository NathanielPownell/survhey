import React from 'react';
import { Link } from 'react-router-dom';
import errorImg from '../assets/error.png'
import Button from '../components/UI/Button';

import './css/NotFound.css'

const NotFound = () => {
  return <div className='NotFound'>
      <div className='error'>
          <img src={errorImg} />
          <h2>
              Hmm... Something's not right.
          </h2>
          <Link to="/">Take me home.</Link>
      </div>
  </div>;
};

export default NotFound;
