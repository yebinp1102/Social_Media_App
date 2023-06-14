import { Box } from "@mui/material"
import {styled} from "@mui/system"


// syntax for reusing css as an component
// CSS를 컴포넌트로 재사용하기 위한 문법
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
})

export default FlexBetween;