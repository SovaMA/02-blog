import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Post from '../components/Post';

export default function Home({ posts }) {
  const { status, error } = useSelector((state) => state.posts);
  return (
    <main className='main container'>
      {status === 'pending' ? (
        <h1>Loading...</h1>
      ) : error ? (
        <>
          <h2 className='notFound_title'>Posts not found</h2>
          <h2>{error}</h2>
          <Link to={`/`}>
            <button className='btn notFound_btn'>Go To Homepage</button>
          </Link>
        </>
      ) : posts.length === 0 ? (
        <>
          <h2 className='notFound_title'>You didn't add any posts</h2>
          <h2>{error}</h2>
          <Link to={`posts`}>
            <button className='btn notFound_btn'>Add something</button>
          </Link>
        </>
      ) : (
        <>
          <h2 className='main_title'>Home</h2>
          {posts.map((post) => (
            <Post key={post.id} {...post} />
          ))}
        </>
      )}
    </main>
  );
}
