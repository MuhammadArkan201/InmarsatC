import React from 'react';
import Inmarsatlogo from '../Img/Logo.png';

const Logo = () => {
  return (
    <div className='logo'>
      <div className='logo-icon'>
        <img src={Inmarsatlogo} alt="Inmarsat" style={{ width: '150px', height: '70px' }} />
      </div>
    </div>
  );
}

export default Logo;
