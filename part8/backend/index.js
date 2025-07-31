import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './graphql/typeDefs.js'
import { resolvers } from './graphql/resolvers.js'
import mongoose from 'mongoose'
import Book from './models/book.model.js'
import Author from './models/author.model.js'
import User from './models/user.model.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { getTokenFrom } from './services/auth.service.js'
// import authService from './services/auth.service.js'


dotenv.config()
mongoose.set('strictQuery', false)

const MONGODB_URI = process.env.MONGODB_URI
// console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then( async () => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
})


const context = async ({ req }) => {
  // αυτή η αλλαγή είναι απαραίτητη στην μεταφορα απο REST σε GraphQL
  // const token = getTokenFrom(req)
  const headers =  req?.headers || {}
  console.log('Request headers:', headers) 
  const token = getTokenFrom(headers)

  if (token) {
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    } catch (error) {
      console.error('Error verifying token:', error.message)
    }
  }
  return {}
}

startStandaloneServer(server, {
  listen: { port: 4000 },
  context
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})