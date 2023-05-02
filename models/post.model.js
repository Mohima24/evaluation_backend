const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    text: String,
    image: String,
    createdAt: Date,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    comments: [{
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
      text: String,
      createdAt: Date
    }]
  },{
    VersionKey: false
  })

const Postmodel = mongoose.model('Post',postSchema);

module.exports = Postmodel