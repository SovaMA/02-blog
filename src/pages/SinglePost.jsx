import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchDeletePost } from '../redux/slices/posts/postSlice';

export default function SinglePost({ posts }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const post = posts.find((post) => post.id.toString() === id);

  const deletePostHandler = (id) => {
    dispatch(fetchDeletePost(id));
    navigate('/');
  };
  return (
    <main className='main container'>
      {post ? (
        <>
          <h2 className='main_title'>Post</h2>
          <article className='post'>
            <h1 className='post_title'>{post.title}</h1>
            <p className='post_text'>{post.body}</p>
            <button
              className='btn delete border'
              onClick={() => deletePostHandler(post.id)}>
              Delete
            </button>
            <Link to={`edit`}>
              <button className='btn edit border'>Edit</button>
            </Link>
          </article>
        </>
      ) : (
        <>
          <h2 className='notFound_title'>Posts not found</h2>
          <Link to={`/`}>
            <button className='btn notFound_btn'>Go To Homepage</button>
          </Link>
        </>
      )}
    </main>
  );
}
