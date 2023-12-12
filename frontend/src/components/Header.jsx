import { Link } from 'react-router-dom'
import logo from '../assets/itruth-logo.png'
import { UseAuthContext } from '../hooks/useAuthContext'
import {useNavigate} from 'react-router-dom'
export const Header = () => {
  const {state,dispatch} = UseAuthContext()
  const navigate = useNavigate()
  const handleLogout = () =>{
    localStorage.removeItem('user')
    dispatch({type:'LOGOUT'})
    navigate('/')
  }
  return (
    <div className='shadow-lg md:p-2 md:flex justify-between items-center'>
        <Link to={'/'}>
        <img src={logo} alt="logo" />
        </Link>
        <nav className='flex gap-2'>
            <Link to="/" className='text-white font-bold capitalize'>Home</Link>
            <Link to="/" className='text-white font-bold capitalize'>Articles</Link>
            <Link to="/" className='text-white font-bold capitalize'>About</Link>
            <Link to="/" className='text-white font-bold capitalize'>contact</Link>
        </nav>
        <div className="">
    {state.user ?
    <button onClick={handleLogout}  className='bg-yellow px-6 py-2 rounded-full '>logout</button>:
    <Link to='/login' className='bg-yellow px-6 py-2 rounded-full '>login</Link>
  }
        </div>
    </div>
  )
}
