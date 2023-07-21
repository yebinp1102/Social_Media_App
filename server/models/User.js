import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  introduction: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  friends: {
    type: Array,
    default: []
  }
},{ timestamps: true});

const User = mongoose.model("User", UserSchema);
export default User