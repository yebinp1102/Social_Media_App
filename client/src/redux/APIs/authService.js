import axios from "axios";

const API = '/api/auth'

// 회원가입 register
const register = async(userData) => {
  try{
    const res = await axios.post(`${API}/register`, userData);
    return res.data
  }catch(err){
    console.log('register api를 FE에서 처리하는 도중 에러 발생')
  }
}

// 로그인 login
const login = async(userData) => {
  try{
    const res = await axios.post(`${API}/login`, userData)
    if(res.data){
      localStorage.setItem('user', JSON.stringify(res.data));
    }
    return res.data
  }catch(err){
    console.log(`login api를 FE에서 처리하는 도중 에러 발생`)
  }
}


const authAPIs = {
  register,
  login
}

export default authAPIs