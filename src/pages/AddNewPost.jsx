import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewBody, setNewTitle } from '../redux/slices/inputs/inputsSlice';
import { useNavigate } from 'react-router-dom';
import { fetchAddPost } from '../redux/slices/posts/postSlice';

export default function AddNewPost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newTitle = useSelector((state) => state.inputs.newTitle);
  const newBody = useSelector((state) => state.inputs.newBody);

  const addPostHandler = (e) => {
    e.preventDefault();
    if (!newTitle && !newBody) return;
    dispatch(fetchAddPost({ newTitle, newBody }));
    dispatch(setNewTitle(''));
    dispatch(setNewBody(''));
    navigate('/');
  };

  return (
    <main className='main container'>
      <h2 className='main_title'>New Post</h2>
      <form className='form' onSubmit={(e) => addPostHandler(e)}>
        <label htmlFor='formTitle' className='form_title'>
          Title
        </label>
        <input
          id='formTitle'
          type='text'
          className='input title_input'
          value={newTitle}
          onChange={(e) => dispatch(setNewTitle(e.target.value))}
          required
        />
        <label htmlFor='formText' className='form_text'>
          Text
        </label>
        <textarea
          id='formText'
          className='input text_input'
          value={newBody}
          onChange={(e) => dispatch(setNewBody(e.target.value))}
          required
        />
        <button className='btn add border' type='submit'>
          Add Post
        </button>
      </form>
    </main>
  );
}
