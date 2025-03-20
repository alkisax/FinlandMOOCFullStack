import { render, screen } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

import { test, expect } from 'vitest'

test('<NewBlogForm /> calls setBlogs with the right details when a new blog is created', async () => {
  // Mock the functions passed as props
  const mockSetBlogs = vi.fn()
  const mockSetMessage = vi.fn()
  const mockSetNotStatus = vi.fn()
  const mockHandleNewBlog = vi.fn()

  const blogFormRef = { current: { toggleVisibility: vi.fn() } }

  const user = userEvent.setup()

  const mockBlog  = {
    title: 'test',
    author: 'tester',
    url:'http://localhost:5173',
    likes: 0
  }

  render(
    <NewBlogForm
      setMessage={mockSetMessage}
      setBlogs={mockSetBlogs}
      setNotStatus={mockSetNotStatus}
      blogs={[]}
      blogFormRef={blogFormRef}
      user={{ username: 'tester' }}
      handleNewBlog={mockHandleNewBlog}
    />
  )

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const submitButton = screen.getByText('create')

  await user.type(titleInput, mockBlog.title)
  await user.type(authorInput, mockBlog.author)
  await user.type(urlInput, mockBlog.url)

  await user.click(submitButton)

  expect(mockHandleNewBlog).toHaveBeenCalledTimes(1)

})