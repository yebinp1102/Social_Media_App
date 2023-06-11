import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from "../models/User.js";

// register user 회원가입
export const register = async(req, res) => {
  try{
    const {name, email, password, picturePath, friends, location, occupation} = req.body;
    
    // encrypt password 비밀번호 암호화
    const salt = await bcrypt.genSalt()
    // hash password 비밀번호 해시화
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      name, 
      email, 
      password : passwordHash, 
      picturePath, 
      friends, 
      location, 
      occupation,
      // viewedProfile, impressions에 1~10000 사이의 임의의 숫자를 할당
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000)
    })
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  }catch(err){
    res.status(400).json({error: 'faile to register 회원가입에 실패했습니다.'});
  }
}

// login
export const login = async(req, res) => {
  try{
    const {email, password} = req.body;
    const user = await User.findOne({ email: email});
    if(!user) return res.status(400).json({msg: "User does not exist 존재하지 않는 유저의 이메일입니다."})

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({msg: "Invalid credential 올바르지않은 접근입니다."})

    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET)
    delete user.password; // FE에 password를 보내지 않기 위해 delete

    res.status(200).json({token, user});


  }catch(err){
    res.status(400).json({error: 'faile to login 로그인에 실패했습니다.'});
  }
}