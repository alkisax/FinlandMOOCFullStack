import { render, screen } from '@testing-library/react'
import Blog from './Blog'

import { test, expect, vi } from 'vitest'

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
  expect(container).not.toHaveTextContent('0')
})