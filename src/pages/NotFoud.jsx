import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoud() {
  return (
    <main className='main container'>
      <h2 className='notFound_title'>Page not found</h2>
      <Link to={`/`}>
        <button className='btn notFound_btn'>Go To Homepage</button>
      </Link>
    </main>
  );
}
