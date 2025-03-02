const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe ('totalLikes', () => {
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
    }
  ]
  test('total likes is 11', ()  => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 11)
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