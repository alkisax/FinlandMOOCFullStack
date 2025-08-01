import { Schema, model } from 'mongoose'

const schema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  hashedPassword: {
    type: String,
    required: [true, 'password is required'],
  },
  favoriteGenre: {
    type: String,
    default: ''
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
})

export default model('User', schema)