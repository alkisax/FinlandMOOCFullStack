import jwt from 'jsonwebtoken'
import { compare } from 'bcrypt'
const { sign, verify } = jwt

export const generateAccessToken = (user) => {
  const payload = {
    username: user.username,
    id: user._id
  }

  const secret = process.env.SECRET
  const options = {
    expiresIn: '1h'
  }
  const token = sign(payload, secret, options)
  return token
}

export const verifyPassword = async (password, hashedPassword) => {
  return await compare(password, hashedPassword)
}

export const verifyAccessToken = (token) => {
  const secret = process.env.SECRET
  try {
    const payload = verify(token, secret)
    return { 
      verified: true, data: payload
    }
  } catch (error) {
    return { 
      verified: false, data: error.message
    }
  }
}

export const getTokenFrom = (headers) => {

  // αυτή η αλλαγή είναι απαραίτητη στην μεταφορα απο REST σε GraphQL
  const authorization = headers.authorization
  // const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.replace('Bearer ', '')
    // console.log(token)
    return token    
  }
  return null
}

