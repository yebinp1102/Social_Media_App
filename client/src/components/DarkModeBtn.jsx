import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { switchMode } from "redux/Slices/modeSlice";
import styled from 'styled-components'


const DarkModeButton = styled.button`
  position: fixed;
  bottom: 15px;
  right: 15px;
  background: var(--${(props) => props.dark}-bg-color);
  border: 1px solid var(--${(props) => props.dark}-color);
  color: var(--${(props) => props.dark}-color);
  padding: 10px;
  width: 110px;
  border-radius: 10px;
  
  .btnWrap{
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: center;
  }

`;


const DarkModeBtn = () => {

  const dispatch = useDispatch();
  const {dark} = useSelector((state) => state.mode);

  const handleSwitchMode = () => {
    dispatch(switchMode(dark))
  }

  return (
    <DarkModeButton dark={dark ? 'dark' : 'light'}>
      {!dark ? (
        <div className="btnWrap" onClick={handleSwitchMode}>
          <FaMoon /> <p>다크모드</p>
        </div>
      ) : (
        <div className="btnWrap" onClick={handleSwitchMode}>
          <FaSun /> <p>라이트모드</p>
        </div>
      )}
    </DarkModeButton>
  )
}

export default DarkModeBtn