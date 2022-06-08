const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs
  .map(blog => blog.likes)
  .reduce((prev, curr) => prev + curr, 0);
  return sum
}

const maxLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const sorted = likes.sort((a, b) => a - b)
  const maxAmount = sorted[sorted.length - 1]
  const blogHavingMaxLikes = blogs.find(blog => blog.likes === maxAmount)
  return blogHavingMaxLikes
}

module.exports = {
    dummy,
    totalLikes,
    maxLikes,
}