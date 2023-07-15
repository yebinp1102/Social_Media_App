import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "redux/Slices/authSlice";
import Loading from "components/Loading";
import styled from 'styled-components'

const RegisterWrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--${(props) => props.dark ? 'dark' : 'light'}-bg-color);
  color: var(--${(props) => props.dark ? 'dark' : 'light'}-color);

  .btn{
    border-color: var(--${(props) => props.dark ? 'dark' : 'light'}-color);
  }
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);
  const {dark} = useSelector((state) => state.mode);

  useEffect(() => {
    if(isError){
      console.log('error')
    }
    if(user){ 
      // 이미 로그인 한 상태면 회원가입에 접근하기 못하게 함
      navigate('/')
    }
    if(isSuccess){
      alert('회원가입 되었습니다.')
      navigate('/login');
    }
    dispatch(reset());
  },[user, isError, isSuccess, message, navigate, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      password
    }
    dispatch(register(userData))
  }

  if(isLoading){
    return <Loading />
  }

  return (
    <RegisterWrap dark={dark}>
      <div className={`container ${dark ? 'dark' : 'light'}`}>
        <section className="heading">
          <h1>
            <FaUser />회원가입
          </h1>
          <p>새로운 계정이 필요하신가요?</p>
        </section>
        
        <section className="form">
          <form onSubmit={handleSubmit}>

            {/* 이름 name */}
            <div className="form-group">
              <input 
                type="text" 
                className="form-control" 
                id="name"
                name="name"
                value={name}
                placeholder="이름을 입력 해주세요."
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* 이메일 email */}
            <div className="form-group">
              <input 
                type="email" 
                className="form-control" 
                id="email"
                name="email"
                value={email}
                placeholder="이메일을 입력 해주세요."
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* 비밀번호 password */}
            <div className="form-group">
              <input 
                type="text" 
                className="form-control" 
                id="password"
                name="password"
                value={password}
                placeholder="비밀번호를 입력 해주세요."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* 비밀번호 확인 confirm password */}
            <div className="form-group">
              <input 
                type="text" 
                className="form-control" 
                id="confirmPassword" 
                name="confirmPassword" 
                value={confirmPassword} 
                placeholder="비밀번호를 재입력 해주세요."
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            
            {/* 버튼 */}
            <div className="form-group">
              <button disabled={password !== confirmPassword} className="btn btn-block">회원가입</button>
            </div>

          </form>
        </section>
      </div>
    </RegisterWrap>
  )
}

export default Register