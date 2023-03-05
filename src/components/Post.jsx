import React from 'react';
import { Link } from 'react-router-dom';

export default function Post({ id, title, body }) {
  return (
    <article className='post border'>
      <Link className='post_link' to={`posts/${id}`}>
        <h1 className='post_title'>{title}</h1>
        <p className='post_text'>{body}</p>
      </Link>
    </article>
  );
}
