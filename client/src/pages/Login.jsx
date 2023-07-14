import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "redux/Slices/authSlice";
import Loading from "components/Loading";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);

  useEffect(() => {
    if(isError){
      console.log('error')
    }
    if(user){ 
      // 이미 로그인 한 상태면 로그인에 접근하기 못하게 함
      navigate('/')
    }
    if(isSuccess){
      alert(`로그인 되었습니다. 안녕하세요 ${user.name} 님!`);
      navigate('/');
    }
  },[user, isError, isSuccess, message, navigate, dispatch])

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password
    }
    dispatch(login(userData))
  }

  if(isLoading){
    return <Loading />
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> 로그인
        </h1>
        <p>이미 계정이 있으신가요?</p>
      </section>
      
      <section className="form">
        <form onSubmit={handleSubmit}>

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
          
          {/* 버튼 */}
          <div className="form-group">
            <button className="btn btn-block">회원가입</button>
          </div>

        </form>
      </section>
    </>
  )
}

export default Login