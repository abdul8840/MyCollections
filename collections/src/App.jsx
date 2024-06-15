import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import Header from './components/Header';
import EditPost from './pages/EditPost';
import PostDetails from './pages/PostDetails';


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path='/post-list/:id' element={<PostDetails />} />
          <Route path='/edit-post/:id' element={<EditPost />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App