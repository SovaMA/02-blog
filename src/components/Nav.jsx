import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setSearchInput } from '../features/inputs/inputsSlice';

export default function Nav() {
  const dispatch = useDispatch();
  const searchInput = useSelector((state) => state.inputs.search);
  return (
    <nav className='nav'>
      <input
        className='search_input input'
        type='text'
        placeholder='Search'
        value={searchInput}
        onChange={(e) => dispatch(setSearchInput(e.target.value))}
      />
      <ul className='nav_links'>
        <Link to={'/'} className='nav_link'>
          <li>Home</li>
        </Link>
        <Link to={'/posts'} className='nav_link'>
          <li>Posts</li>
        </Link>
        <Link to={'/about'} className='nav_link'>
          <li>About</li>
        </Link>
      </ul>
    </nav>
  );
}
