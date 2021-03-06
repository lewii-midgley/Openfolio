const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name : String,
  image_url: String,
  description: String,
  author: String,
  url: String
})

module.exports = mongoose.model('Project', projectSchema);


