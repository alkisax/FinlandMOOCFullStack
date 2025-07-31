import { Schema, model } from 'mongoose'

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  published: {
    type: Number,
    required: true,
    minlength: 4
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  genres: {
    type: [String],
    required: true,
  }
})

export default model('Book', bookSchema)