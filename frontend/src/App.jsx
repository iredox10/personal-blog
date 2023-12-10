import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import './App.css'
import { Admin } from './pages/Admin'
import { AdminBlogs } from './pages/AdminBlogs'
import BlogPage from './pages/BlogPage'
import EditBlog from './pages/EditBlog'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/category-blogs/:slug" element={<AdminBlogs />} />
        <Route path="/edit-blogs/:slug" element={<EditBlog />} />
      </Routes>
    </Router>
  );
}

export default App
