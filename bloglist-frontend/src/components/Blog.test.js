import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
  beforeEach(() => {
    component = render(
      <Blog blog={blog}/>
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
})