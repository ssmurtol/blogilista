const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Otsikko1",
    author: "Masa Mikkonen",
    url: "http://esimerkki.fi",
    likes: 200
  },
  {
    title: "Otsikko2",
    author: "Maija Meikäläinen",
    url: "http://esimerkki.fi",
    likes: 50
  },
]
  
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
  })

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "Otsikko3",
    author: "Matti Meikäläinen",
    url: "http://esimerkki.fi",
    likes: 100
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length + 1)
})

afterAll(() => {
  mongoose.connection.close()
})


