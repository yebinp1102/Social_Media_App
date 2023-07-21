import User from "../models/User.js"

// get user (read)
export const getUser = async(req, res) => {
  try{
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  }catch(err){
    res.status(400).json({message: err.message});
  }
}

// get user friends (read)
export const getUserFriends = async(req, res) => {
  try{
    const {id} = req.params;
    const user = await User.findById(id);

    // DB에서 multiple API call을 해야 하기 때문에 Promise.all 사용
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    // FE를 위해 적절한 형식으로 변경
    const formattedFriends = friends.map(
      ({ _id, name, occupation, location, picturePath}) => {
        return { _id, name, occupation, location, picturePath}
      }
    )
    res.status(200).json(formattedFriends)
  }catch(err){
    res.status(400).json({message: err.message});
  }
}


// add or remove friend (update)
export const addRemoveFriend = async(req, res) => {
  try{
    const {id, friendId} = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    // friends 배열에 add 나 remove할 때 본인과 상대방 계정에 모두 적용.
    if(user.friends.includes(friendId)){
      // 이미 친구 추가 된 계정이면 유저의 friends 배열에서 친구id 제거
      // 친구의 friends 배열에서도 유저 id 제거
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = user.friends.filter((id) => id !== id);
    }else{
      // 친구 추가한 적 없는 계정이면 유저와 친구의 friends 배열의 각자의 id push
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    // FE를 위해 적절한 형식으로 변경
    const formattedFriends = friends.map(
      ({ _id, name, occupation, location, picturePath}) => {
        return { _id, name, occupation, location, picturePath}
      }
    )    

    res.status(200).json(formattedFriends);
  }catch(err){
    res.status(400).json({message: err.message});
  }
}

export const updateUser = async(req, res) => {
  try{
    const {name, introduction, image} = req.body;

    // 해당 유저가 존재하는지 먼저 확인
    const user = await User.findById(req.params.id);
    if(!user){
      res.status(400).json({message: '존재하지 않는 유저의 정보 입니다.'})
    }

    // 유저 정보가 존재하면 업데이트 진행
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {name, introduction, image}, {new: true});
    res.status(200).json(updatedUser)
  }catch(err){
    res.status(400).json({message: 'BE에서 유저 정보를 업데이트 하는 과정에서 에러가 발생했습니다.'})
  }
}