const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString() // Convert _id (ObjectId) to a string and store it in 'id'
    delete returnedObject._id // Remove the original _id field
    delete returnedObject.__v // Remove the __v field (used for versioning by Mongoose)
  }
})

module.exports = mongoose.model('Blog', blogSchema)