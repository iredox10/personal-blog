import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './pages/Home'
import './App.css'
import { Admin } from './pages/Admin'
import { AdminBlogs } from './pages/AdminBlogs'
import BlogPage from './pages/BlogPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/blog/:slug' element={<BlogPage />} />

        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-blogs/:slug" element={<AdminBlogs />} />
      </Routes>
    </Router>
  )
}

export default App
