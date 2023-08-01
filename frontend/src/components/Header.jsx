import { Link } from 'react-router-dom'
import logo from '../assets/itruth-logo.png'
export const Header = () => {
  return (
    <div className='shadow-lg md:p-2 md:flex justify-between items-center'>
        <div>
        <img src={logo} alt="logo" />
        </div>
        <nav className='flex gap-2'>
            <Link to="/" className='text-white font-bold capitalize'>Home</Link>
            <Link to="/" className='text-white font-bold capitalize'>Articles</Link>
            <Link to="/" className='text-white font-bold capitalize'>About</Link>
            <Link to="/" className='text-white font-bold capitalize'>contact</Link>
        </nav>
        <div className="">
            <Link to='/login' className='bg-yellow px-6 py-2 rounded-full '>login</Link>
        </div>
    </div>
  )
}
