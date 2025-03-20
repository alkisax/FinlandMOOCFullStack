import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

import { test, expect, beforeEach, vi } from 'vitest'

test('renders title and author but not URL or likes', () => {
  const blog = {
    title: 'test',
    author: 'tester',
    url:'http://localhost:5173',
    likes: 0
  }

  const { container } = render(<Blog blog={blog} />)

  const element = container.querySelector('#testerTitleAuthor')
  expect(element).not.toBeNull()
  expect(element).toHaveTextContent('test')
  expect(element).toHaveTextContent('tester')
  expect(element).not.toHaveTextContent('localhost')
  expect(element).not.toHaveTextContent('0')
})

test('likes and url are shown when btn pressed', async () => {
  const blog = {
    title: 'test',
    author: 'tester',
    url:'http://localhost:5173',
    likes: 0
  }

  const { container } = render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const urlParagraph = container.querySelector('#testUrl')
  const likesParagraph = container.querySelector('#testLikes')
  expect(urlParagraph).toHaveTextContent('localhost')
  expect(likesParagraph).toHaveTextContent('0')
})

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {

  const blog = {
    title: 'test',
    author: 'tester',
    url:'http://localhost:5173',
    likes: 0
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()

  const viewBtn  = screen.getByText('view')
  await user.click(viewBtn)

  const likeBtn = screen.getByText('Like!')
  await user.click(likeBtn)
  await user.click(likeBtn)
  expect(mockHandler.mock.calls).toHaveLength(2)
})