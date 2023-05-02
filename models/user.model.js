const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dob: Date,
  bio: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users'}],
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users'}]
},{
    VersionKey:false
})

const Usermodel = mongoose.model('User',userSchema);

module.exports=Usermodel