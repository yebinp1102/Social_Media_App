import { useSelector } from 'react-redux';
import styled from 'styled-components'

const Container = styled.section`
  background-color: var(--${(props) => props.dark ? 'dark' : 'light'}-bg-color);
  color: var(--${(props) => props.dark ? 'dark' : 'light'}-color);
  border: 1px solid blue;
  height: 100%;
`;

const MyFeed = () => {
  const {dark} = useSelector((state) => state.mode)

  return (
    <Container dark={dark}>
      This is My Feed
    </Container>
  )
}

export default MyFeed