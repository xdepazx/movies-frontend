import {FaPlusCircle, FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }

    
  return (
    <header className='header'>
        <div className="logo">
            <Link to='/'>Oura Movies</Link>
        </div>
        <ul>
            {/* si está el user, muestra una cosa, sino otra ? */}
            {user ? (
                <>
                <li>
                <button type='submit' className='btn btn-primary' onClick={onLogout}>
                    <FaSignOutAlt/> Logout
                </button>
                </li>
                <li>
                    <button type='button' className="btn btn-primary">
                        <Link to='/createMovie'><FaPlusCircle/>Add Movie</Link>
                    </button>
                </li>
                </>
            ) : (
            <>     
            <li>
                <Link to='/login'><FaSignInAlt/>Login</Link>
            </li>
            <li>
                <Link to='/register'><FaUser/>Register</Link>
            </li>
            </>)}
        </ul>
    </header>
  )
}

export default Header