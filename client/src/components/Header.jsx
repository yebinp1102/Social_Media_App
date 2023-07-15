import { Link, useNavigate } from "react-router-dom"
import { FaSignOutAlt, FaSignInAlt, FaUser } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { reset, logout } from "redux/Slices/authSlice"
import styled from 'styled-components'

const HeaderContainer = styled.header`
position: fixed;
width: 100vw;
z-index: 1000;
display: flex;
justify-content: space-between;
align-items: center;
padding: 20px;
border-bottom: 1px solid var(--${(props) => props.dark ? 'dark' : 'light'}-color);

ul{
  display: flex;
  align-items: center;
  justify-content: space-between;
}

ul li{
  margin-left: 25px;
}

ul li a {
  display: flex;
  align-items: center;
}

ul li a:hover {
  color: #777;
}

ul li a svg {
  margin-right: 5px;
}
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user} = useSelector((state) => state.auth);
  const {dark} = useSelector((state) => state.mode)

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  }

  return (
    <HeaderContainer dark={dark ? true: false} className={` ${dark ? 'dark' : 'light'}`}>

      <div className="logo">
        <Link to='/'>SNS</Link>
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
    </HeaderContainer>
  )
}

export default Header

