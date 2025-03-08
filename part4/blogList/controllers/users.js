const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { content: 1, important: 1 }) //populate
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // Check if the username already exists
  //αυτα δεν ήταν στο μάθημα αλλα αναγκα΄στικα να τα προσθέσω γιατί ένα τεστδεν πέρναγε με τίποτα, δεν το έπιανε το middleware
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }

  // Ensure username and password are provided
  if (!username || !password) {
    return response.status(400).json({ error: 'username and password are required' })
  }

  // Check username length
  if (username.length < 3) {
    return response.status(400).json({ error: 'username must be at least 3 characters long' })
  }
  
  if (password.length < 3){
    return response.status(400).json({ error: 'password must be longer than 3 chars' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter