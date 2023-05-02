const mongoose = require('mongoose');

const conncetion = mongoose.connect('mongodb+srv://Mohima:mohima@cluster0.nniwend.mongodb.net/postapp')

module.exports = conncetion
