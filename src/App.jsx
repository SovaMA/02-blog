import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from './features/posts/postSlice';
import { useEffect } from 'react';
import Layout from './components/Layout';
import About from './pages/About';
import AddNewPost from './pages/AddNewPost';
import EditPost from './pages/EditPost';
import Home from './pages/Home';
import NotFoud from './pages/NotFoud';
import SinglePost from './pages/SinglePost';

function App() {
  const dispatch = useDispatch();

  const allPosts = useSelector((state) => state.posts.posts);
  const searchInput = useSelector((state) => state.inputs.search);

  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      post.body.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home posts={filteredPosts} />} />
          <Route path='posts'>
            <Route index element={<AddNewPost />} />
            <Route path=':id' element={<SinglePost posts={filteredPosts} />} />
            <Route path=':id/edit' element={<EditPost posts={allPosts} />} />
          </Route>
          <Route path='about' element={<About />} />
          <Route path='*' element={<NotFoud />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
