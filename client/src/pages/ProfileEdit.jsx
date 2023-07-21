import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, updateProfile } from 'redux/Slices/userSlice';
import styled from 'styled-components'

const ProfileEditContainer = styled.div`
  background-color: var(--${(props) => props.dark ? 'dark' : 'light'}-bg-color);
  color: var(--${(props) => props.dark ? 'dark' : 'light'}-color);
  height: 100vh;
  width: 100vw;
  padding-top: 80px;

  .btn-border{
    border: 1px solid var(--${(props) => props.dark ? 'dark' : 'light'}-color);
  }
`;

const ProfileEdit = () => {
  const {dark} = useSelector((state) => state.mode)
  const {user, isSuccess} = useSelector((state) => state.user);

  const [name, setName] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [image, setImage] = useState('');
  

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

    // 기존 유저 정보를 불러옴
    if(user){
      setName(user.name);
      setIntroduction(user.introduction);
    }

    if(!user){
      navigate('/')
    }

    if(isSuccess){
      navigate(-1)
      // navigate('/')
    }

    dispatch(reset());

  },[user, isSuccess]);

  const handleProfileEdit = (e) => {
    e.preventDefault();

    const userData = {
      id: user._id,
      name,
      introduction,
      image
    }

    dispatch(updateProfile(userData))

  }

  return (
    <ProfileEditContainer dark={dark}>
      <div className="fixedWidth form">
        <form onSubmit={handleProfileEdit} className="profile-edit-container">

          <div className="form-group">
            <label>이름 </label>
            <input 
              type="text" 
              className="form-control" 
              id="name"
              name="name"
              value={name}
              placeholder="수정 할 이름을 입력해 주세요."
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
              <label>자기 소개 </label>
              <textarea 
                type="text" 
                className="form-control" 
                id="introduction"
                name="introduction"
                value={introduction}
                placeholder="새로운 자기 소개를 작성해주세요(100자 이하)."
                onChange={(e) => setIntroduction(e.target.value)}
                maxLength="100"
                style={{height: "200px"}}
              />
            </div>

          <button className="btn btn-border" type='submit'>
            수정하기
          </button>
        </form>
      </div>
      
    </ProfileEditContainer>
  )
}

export default ProfileEdit