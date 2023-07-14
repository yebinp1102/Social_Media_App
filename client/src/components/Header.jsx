import { Link, useNavigate } from "react-router-dom"
import { FaSignOutAlt, FaSignInAlt, FaUser } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { reset, logout } from "redux/Slices/authSlice"

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <header className='header'>
      <div className="logo">
        <Link to='/'>SNS 앱</Link>
      </div>
      <ul>
        {user ? (
          <>
            <li>
              <button className="btn" onClick={handleLogout}>
                <FaSignOutAlt />로그아웃
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt />로그인
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser />회원가입
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header