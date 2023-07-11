import React from 'react';
import notfound from '../../images/404-error-template-3.png.webp';

export default function NotFound() {
  return (
    <div className='test-center w-100 h-100'>
      <img src={notfound} className='w-100 h-auto' alt='not found image'/>
    </div>
  )
}
