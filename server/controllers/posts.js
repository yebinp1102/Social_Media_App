import Post from '../models/Post.js';
import User from '../models/User.js';

// create
export const createPost = async(req, res) => {
  try{
    const {userId, description, picturePath} = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      name : user.name,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: []
    })

    await newPost.save();

    const post = await Post.find();
    res.status(200).json(post);

  }catch(err){
    res.status(400).json({message: err.message});
  }
}

// read
export const getFeedPosts = async(req, res) => {
  try{
    const post = await Post.find();
    res.status(200).json(post);
  }catch(err){
    res.status(400).json({message: err.message});
  }
}

export const getUserPosts = async(req, res) => {
  try{
    const {userId} = req.params;
    const post = await Post.find({userId});
    res.status(200).json(post);
  }catch(err){
    res.status(400).json({message: err.message});
  }
}

// update
export const likePost = async(req, res) => {
  try{
    const {id} = req.params;
    const{userId} = req.body;

    // 좋아요할 post를 id로 식별
    const post = await Post.findById(id);

    // post의 likes에서 userId값이 true인지 false인지 판별
    const isLiked = post.likes.get(userId);

    if(isLiked){
      // isLiked가 true이면 이미 해당 포스트에 좋아요를 누른 상태니 좋아요 취소를 위해 likes에서 userId값 제거
      post.likes.delete(userId);
    }else{
      // isLiked가 false면 해당 포스트에 좋아요 수행 -> likes에 {userId : true} 추가
      post.likes.set(userId, true);
    }

    // 변경된 likes 정보를 업데이트
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {likes: post.likes},
      {new: true}
    );

    res.status(200).json(updatedPost)
  }catch(err){
    res.status(400).json({message: err.message});
  }
}