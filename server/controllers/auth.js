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