const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs')
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  } else if (!username) {
  return response.status(400).json({
    error: 'username is missing'
    })
  } else if (username.length < 3)  {
    return response.status(400).json({
      error: 'min length of username is 3'
    })
  } else if (!password) {
    return response.status(400).json({
      error: 'password is missing'
  })
  } else if (password.length < 3)  {
    return response.status(400).json({
      error: 'min length of password is 3'
  })
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

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


module.exports = usersRouter