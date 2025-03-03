const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  {
    "title": "My first blog",
    "author": "John Doe",
    "url": "https://example.com",
    "likes": 5,
    "id": "67c43dfbd6f18f0154eb45be"
  },
  {
    "title": "My second blog",
    "author": "Johan Doe",
    "url": "https://example2.com",
    "likes": 6,
    "id": "67c43e35d6f18f0154eb45c1"
  },
  {
    "title": "Third blog",
    "author": "John Doe",
    "url": "https://example3.com",
    "likes": 3,
    "id": "67c43e35d6f18f0154eb45c2"
  },
  {
    "title": "Third blog second edition",
    "author": "John Doe",
    "url": "https://example32.com",
    "likes": 1,
    "id": "67c43e35d6f18f0154eb45d2"
  },
  {
    "title": "Fourth blog",
    "author": "Johan Doe",
    "url": "https://example4.com",
    "likes": 7,
    "id": "67c43e35d6f18f0154eb45c3"
  },
  {
    "title": "Fifth blog",
    "author": "Alice Smith",
    "url": "https://example5.com",
    "likes": 8,
    "id": "67c43e35d6f18f0154eb45c4"
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe ('totalLikes', () => {
  test('total likes is 30', ()  => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 30)
  })
  test('total likes is 0 for an empty list', () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  })
  test('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = [blogs[0]]
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe ('mostBlogs', () => {
  test('max likes is 8', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, [{
      "title": "Fifth blog",
      "author": "Alice Smith",
      "likes": 8
    }])
  })

  test('returns empty array for an empty list', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, [])
  })

  test('when list has only one blog, returns that blog', () => {
    const singleBlogList = [blogs[0]]
    const result = listHelper.favoriteBlog(singleBlogList)
    assert.deepStrictEqual(result, [{
      "title": "My first blog",
      "author": "John Doe",
      "likes": 5
    }])
  })
})

describe('maxBlogs', () => {
  test('john doe wrote 3 blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, {
      author: "John Doe",
      blogs: 3
    })
  })

  test('no blogs available (empty list)', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, undefined)
  })
})

describe('maxLikes', () => {
  test('Johan Doe has most likes (13)', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, {
      author: "Johan Doe",
      likes: 13
    })
  })

  test('no likes available (empty list)', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, undefined)
  })
})