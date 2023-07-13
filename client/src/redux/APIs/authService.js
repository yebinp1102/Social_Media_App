import axios from "axios";

const API = '/api/auth'

// 회원가입 register
const register = async(userData) => {
  try{
    const res = await axios.post(`${API}/register`, userData);
    console.log(res);
    // if(res.data) localStorage.setItem('user', JSON.stringify(res.data));
    return res.data
  }catch(err){
    console.log('register api를 처리하는 과정에서 FE 에러 발생')
  }
}


const authAPIs = {
  register
}

export default authAPIs