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

    if(user.friends.includes(friendId)){
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = user.friends.filter((id) => id !== id);
    }else{
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