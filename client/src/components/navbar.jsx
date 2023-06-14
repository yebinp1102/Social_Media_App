import { useState } from "react"
import { 
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery
} from "@mui/material"
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setMode, setLogout } from "state"
import { useNavigate } from "react-router-dom"
import FlexBetween from "./FlexBetween"

const Navbar = () => {
  // size for mobile screen
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const user = useSelector((state) => state.user);
  const user = "test"
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // useTheme으로 theme.js에서 미리 명시한 컬러 옵션에 접근가능
  const theme = useTheme();
  // theme.js에서 사용할 컬러들 추출
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.name}`;


  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography 
        fontWeight="bold" 
        fontSize="clamp(1rem, 2rem, 2.25rem)"
        color="primary"
        onClick={() => navigate("/")}
        sx={{
          "&:hover":{
            color: primaryLight, 
            cursor: "pointer"
          },
        }}
        >
          Social Media
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* Desktop version navbar */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          {/* IconButton 클릭시 setMode가 redux store의 mode state를 변경 light <-> dark */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{fontSize: "25px"}} />
            ): (
              <LightMode sx={{fontSize: "25px", color: dark}} />
            )}
          </IconButton>
          <Message sx={{fontSize: "25px"}} />
          <Notifications sx={{fontSize: "25px"}} />
          <Help sx={{fontSize: "25px"}} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root" : {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select":{
                  backgroundColor: neutralLight
                }
              }}
              input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Log out</MenuItem>
              </Select>
          </FormControl>
        </FlexBetween>) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* Mobile version navbar  */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right= "0"
          bottom= "0"
          height= "100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background} 
        >
          {/* close icon */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* menu items */}
          <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
            {/* IconButton 클릭시 setMode가 redux store의 mode state를 변경 light <-> dark */}
            <IconButton onClick={() => dispatch(setMode())} sx={{fontSize: "25px"}}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{fontSize: "25px"}} />
              ): (
                <LightMode sx={{fontSize: "25px", color: dark}} />
              )}
            </IconButton>
            <Message sx={{fontSize: "25px"}} />
            <Notifications sx={{fontSize: "25px"}} />
            <Help sx={{fontSize: "25px"}} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root" : {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select":{
                    backgroundColor: neutralLight
                  }
                }}
                input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>Log out</MenuItem>
                </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  )
}

export default Navbar