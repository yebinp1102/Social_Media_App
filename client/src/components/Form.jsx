import { useEffect, useState } from "react"
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material"
import { Formik } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setLogin } from "state"

// 지울 부분
// 회원가입 schema
const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});
// 로그인 schema
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
});
const initialValuesRegister = {
  name: '',
  email: '',
  password: '',
  location: '',
  occupation: '',
  picture: ''
}
const initialValuesLogin = {
  email: '',
  password: ''
}

// 여기까지 지우기


const Form = () => {
  // states
  const [pageType, setPageType] = useState('login');
  const {palette}= useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login"
  const isRegister = pageType === "register"

  // data states : name, email, pwd, confrim pwd, picture
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const initialValue = () => {
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  // 회원가입 API
  const register = async() => {
    // this allows us to send form info with img
    const personalInfo = {
      name,
      email,
      password
    }
    const savedUserResponse = await fetch(
      "http://localhost:8000/auth/register",
      {
        method: "POST",
        body: personalInfo,
      }
    )
    const savedUser = await savedUserResponse.json();
    initialValue() // 성공하면 input에 작성된 정보를 리셋

      if(savedUser){
        setPageType("login");
      }
      alert("회원가입에 성공했습니다.")
  }

  // 로그인 API
  const login = async() => {
    const formData = {
      email,
      password
    }
    const loggedInResponse = await fetch(
      "http://localhost:8000/auth/login",
      {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify(formData),
      }
    )

    const loggedIn = await loggedInResponse.json();
    initialValue();
    
    if(loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token
        })
      );
      navigate("/");
    }
  }

  const handleSubmitForm = async() => {
    if(isLogin) await login();
    if(isRegister) await register();
  }

  return (
    <Formik 
      onSubmit={handleSubmitForm} 
      initialValues={initialValue}
    >
      {({
        values,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box 
            display="grid" 
            gap="30px" 
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div" : { gridColumn: isNonMobile ? undefined : "span 4"}
            }}
          >
            {isRegister && (
              <>
                {/* name field */}
                <TextField 
                  label="name"
                  onBlur={handleBlur}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  name="name"
                  sx={{ gridColumn: "span 4"}}
                />

                {/* login */}
                <TextField 
                  label="email"
                  onBlur={handleBlur}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  name="email"
                  sx={{ gridColumn: "span 4"}}
                />
                <TextField 
                  label="password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  name="password"
                  sx={{ gridColumn: "span 4"}}
                />
              </>
            )}
          </Box>

          {/* button */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m:"2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover" : {color: palette.primary.main}
              }}
            >
              {isLogin ? "Login" : "Register"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
              }}
              sx={{textDecoration: "underline", color: palette.primary.main, "&:hover" : { cursor: "pointer", color: palette.primary.light}}}
            >
              {isLogin ? "계정이 없으신가요? 회원가입" : "이미 계정이 있으신가요? 로그인"}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form