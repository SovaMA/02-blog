import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { setEditBody, setEditTitle } from '../redux/slices/inputs/inputsSlice';
import { fetchEditPost } from '../redux/slices/posts/postSlice';

export default function EditPost({ posts }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const editTitle = useSelector((state) => state.inputs.editTitle);
  const editBody = useSelector((state) => state.inputs.editBody);

  const post = posts.find((post) => post.id.toString() === id);

  const editPostHandler = (id, e) => {
    e.preventDefault();
    dispatch(fetchEditPost({ id, editTitle, editBody }));
    dispatch(setEditTitle(''));
    dispatch(setEditBody(''));
    navigate('/');
  };

  useEffect(() => {
    if (post) {
      dispatch(setEditTitle(post.title));
      dispatch(setEditBody(post.body));
    }
  }, [post, setEditBody, setEditTitle]);

  return (
    <main className='main container'>
      {post ? (
        <>
          {' '}
          <h2 className='main_title'>Edit Post</h2>
          <form className='form' onSubmit={(e) => editPostHandler(post.id, e)}>
            <label htmlFor='formTitle' className='form_title'>
              Title
            </label>
            <input
              id='formTitle'
              type='text'
              className='input title_input'
              value={editTitle}
              onChange={(e) => dispatch(setEditTitle(e.target.value))}
            />
            <label htmlFor='formText' className='form_text'>
              Text
            </label>
            <textarea
              id='formText'
              className='input text_input'
              value={editBody}
              onChange={(e) => dispatch(setEditBody(e.target.value))}
            />
            <button className='btn add border' type='submit'>
              Save
            </button>
          </form>
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
