import React from 'react'
import Togglable from './Togglable'
const Blog = ({blog}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title} by <em><strong>{blog.author}</strong></em> 
      &nbsp;<Togglable buttonLabel='View Details' buttonHideLabel='Hide Details'>
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes}&nbsp;<button>Like</button></p>
          <p>{blog.user.username}</p>
        </div>
      </Togglable>
    </div>
  ) 
}

export default Blog