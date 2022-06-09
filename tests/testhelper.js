const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      id: 1,
      title: "Otsikko1",
      author: "Masa Mikkonen",
      url: "http://esimerkki.fi",
      likes: 200
    },
    {
      id: 2,
      title: "Otsikko2",
      author: "Maija Meikäläinen",
      url: "http://esimerkki.fi",
      likes: 100
    },
  ]

const nonExistingId = async () => {
  const blog = new Blog({
      title: 'willberemoved', 
      author: 'Ville Virtanen',
      url: 'http://esimerkki.fi',
      likes: 10
    })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb
}