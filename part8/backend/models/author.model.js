import { Schema, model } from 'mongoose'

const authSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  born: {
    type: Number,
    minlength: 4
  },

})

export default model('Author', authSchema)