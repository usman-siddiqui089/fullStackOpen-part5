import React from 'react'
const Blog = ({blog}) => (
  <div>
    {blog.title} by <em><strong>{blog.author}</strong></em>
  </div>  
)

export default Blog