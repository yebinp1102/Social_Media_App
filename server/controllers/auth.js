import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from "../models/User.js";

// register 회원가입
export const register = async(req, res) => {
  try{
    const {name, email, password} = req.body;

    // 이미 가입된 이메일인지 확인
    const userExistCheck = await User.findOne({email});
    if(userExistCheck) res.status(400).json({message: '이미 해당 이메일로 가입된 계정이 존재합니다.'})
    
    // encrypt password 비밀번호 암호화/해시화
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt);

    // 유저 정보 생성 : 비밀번호는 암호화 된걸로 저장 해야 함

    const user = await User.create({
      name,
      email,
      password: passwordHash
    })
    
    if(user){
      // status 201은 새로운 데이터가 생성 되었음 의미
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email
      })
    }
  }catch(err){
    res.status(400).json({message: '회원가입에 실패했습니다. fail to register '});
  }
}

// 토큰은 유저 id를 베이스로 생성하며 12시간 후 자동 소멸 됨
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
      expiresIn: '12h'
    })
}

// login
export const login = async(req, res) => {
  try{
    const {email, password} = req.body;

    // 이메일에 해당하는 유저 정보가 있는지 확인
    const user = await User.findOne({ email: email});
    if(!user) return res.status(400).json({message: "User does not exist 존재하지 않는 유저의 이메일입니다."})

    // 비밀번호 일치 여부 확인
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message: "Invalid credential 올바르지않은 접근입니다."})

    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token : generateToken(user._id),
      image: user.image,
      friends: user.friends,
      introduction: user.introduction
     });


  }catch(err){
    res.status(400).json({error: 'faile to login 로그인에 실패했습니다.'});
  }
}