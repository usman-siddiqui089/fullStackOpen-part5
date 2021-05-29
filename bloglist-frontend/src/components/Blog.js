import React from 'react'
import Togglable from './Togglable'
const Blog = ({ blog, likeHandler, removeBlogHandler, currentUserName }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenMatched = { display: (blog.user.username === currentUserName) ? '' : 'none' }
  return (
    <div style={blogStyle}>
      <span className="blogTitle">{blog.title}</span> by <span className="blogAuthor"><em><strong>{blog.author}</strong></em></span>
      &nbsp;<Togglable buttonLabel='View Details' buttonHideLabel='Hide Details'>
        <div>
          <p className="blogURL">{blog.url}</p>
          <p className="blogLikes">{blog.likes}&nbsp;<button onClick={likeHandler} value={blog.id}>Like</button></p>
          <p className="blogUsername">{blog.user.username}</p>
          <button style={showWhenMatched} onClick={removeBlogHandler} value={blog.id}>Remove Blog</button>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog