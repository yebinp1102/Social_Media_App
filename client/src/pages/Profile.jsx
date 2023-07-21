import MyFeed from 'components/MyFeed'
import React, { useEffect } from 'react'
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import {BiUserCircle} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getProfile, reset } from 'redux/Slices/userSlice';

const ProfileContainer = styled.section`
  background-color: var(--${(props) => props.dark ? 'dark' : 'light'}-bg-color);
  color: var(--${(props) => props.dark ? 'dark' : 'light'}-color);
  width: 100vw;
  padding-top: 80px;
  height: 100vh;

  .fixedWidth{
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
`;

const MyProfile = styled.div`
  padding: 15px;
  border: 1px solid red;


    .main{
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;

      svg{
        font-size: 3rem;
      }
    }

    .mainleft{
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .mainright{
      :hover{
        cursor: pointer;
      }
      svg{
        font-size: 1.25rem;
      }
    }

  .introduction{
    color: gray;
  }
`;

const Profile = () => {
    const {dark} = useSelector((state) => state.mode)
    const {user} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
      // if(user) dispatch(getProfile(user._id));
      // if(!user) navigate('/login')
    },[user])

    const handleUpdateProfile = () => {
      navigate(`/users/edit/${user._id}`)
    }

  return (
    <ProfileContainer dark={dark}>
      <div className="fixedWidth">
        <MyProfile>
          <div className="main">
            <div className='mainleft'>
              <FaUserCircle/>
              <div>
                <h3>{user.name}</h3>
                <p className="introduction">{user.introduction ? user.introduction.substr(0, 100) : 'No introduction yet'}</p>
              </div>
            </div>  
            <div className="mainright" onClick={handleUpdateProfile}>
              <FaEdit />
            </div>
          </div>
          
          

          <div className="friends">
            Friends : {user.friends.length}
          </div>

        </MyProfile>

        <MyFeed />
      </div>
    </ProfileContainer>
  )
}

export default Profile