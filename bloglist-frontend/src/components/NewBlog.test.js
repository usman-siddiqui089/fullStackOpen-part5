import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlog'

describe('<NewBlog />', () => {
  let component
  const createBlog = jest.fn()
  beforeEach(() => {
    component = render(
      <NewBlogForm createBlog={createBlog}/>
    )
  })
  test('updates parent state and calls onSubmit', () => {
    const title = component.container.querySelector('#title')
    expect(title).toBeDefined()
    const author = component.container.querySelector('#author')
    expect(author).toBeDefined()
    const url = component.container.querySelector('#url')
    expect(url).toBeDefined()
    fireEvent.change(title, {
      target: { value: 'Sample blog for test' }
    })
    fireEvent.change(author, {
      target: { value: 'Anonymous' }
    })
    fireEvent.change(url, {
      target: { value: 'www.sampleURL.com' }
    })
    const form = component.container.querySelector('form')
    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Sample blog for test')
    expect(createBlog.mock.calls[0][0].author).toBe('Anonymous')
    expect(createBlog.mock.calls[0][0].url).toBe('www.sampleURL.com')
  })
})