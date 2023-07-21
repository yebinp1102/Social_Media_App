import axios from "axios";

const API = 'users'

const getProfile = async(userId, token) => {
  try{
    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }

    const res = await axios.get(`${userId}`, config)
    return res.data;
  }catch(err){
    console.log(`get profile api를 FE에서 처리하는 도중 에러 발생`)
  }
}

// 유저 프로필 수정 edit user profile
const updateProfile = async(userData, token) => {
  try{

    const config = {
      headers : {
        Authorization: `Bearer ${token}`
      }
    }
    
    const userId = userData.id
    const res = await axios.put(`${userId}`,  userData, config)
    return res.data;
  }catch(err){
    console.log(`update profile api를 FE에서 처리하는 도중 에러 발생`)
  }
}

const userAPIs = {
  updateProfile,
  getProfile
}

export default userAPIs