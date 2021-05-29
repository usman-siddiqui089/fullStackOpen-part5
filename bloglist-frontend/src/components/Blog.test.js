import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const blog = {
    title: 'Sample blog for unit test',
    author: 'Anonymous',
    url: 'www.sample.com',
    user: {
      username: 'testUser'
    }
  }
  const likeHandler = jest.fn()
  beforeEach(() => {
    component = render(
      <Blog blog={blog} likeHandler={likeHandler}/>
    )
  })
  test('renders content' , () => {
    const title = component.container.querySelector('.blogTitle')
    expect(title).toBeVisible()
    const author = component.container.querySelector('.blogAuthor')
    expect(author).toBeVisible()
    const url = component.container.querySelector('.blogURL')
    expect(url).not.toBeVisible()
    const likes = component.container.querySelector('.blogLikes')
    expect(likes).not.toBeVisible()
    const username = component.container.querySelector('.blogUsername')
    expect(username).not.toBeVisible()
  })
  test('show blog details when button gets clicked', () => {
    const button = component.getByText('View Details')
    expect(button).toBeDefined()
    fireEvent.click(button)
    const url = component.container.querySelector('.blogURL')
    expect(url).toBeVisible()
    const likes = component.container.querySelector('.blogLikes')
    expect(likes).toBeVisible()
    const username = component.container.querySelector('.blogUsername')
    expect(username).toBeVisible()
  })
  test('clicks blog like button', () => {
    const button = component.getByText('View Details')
    expect(button).toBeDefined()
    fireEvent.click(button)
    const likeButton = component.getByText('Like')
    expect(likeButton).toBeDefined()
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})