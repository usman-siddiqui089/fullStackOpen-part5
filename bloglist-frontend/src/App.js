import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if(loggedInUserJSON){
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <>
      <h2>Login to Application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Enter Username: 
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
          Enter Password: 
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  )

  const blogsList = () => (
    <>
      <div>
        <h2>blogs</h2>
        <p>
          {user.username} is logged in
          <button onClick={handleLogout}>Logout</button>
        </p>
        <form onSubmit={addBlog}>
          <div>
            Title:
            <input 
              type="text"
              name="Title"
              value={title}
              onChange={ ( {target} ) => setTitle(target.value) }
            />
          </div>
          <div>
            Author:
            <input 
              type="text"
              name="Author"
              value={author}
              onChange={ ( {target} ) => setAuthor(target.value) }
            />
          </div>
          <div>
            Blog URL:
            <input 
              type="text"
              name="Url"
              value={url}
              onChange={ ( {target} ) => setUrl(target.value) }
            />
          </div>
          <button type='submit'>Add</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (error) {
      alert('Error! Wrong Credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    const savedBlog = await blogService.create(newBlog)
    if(savedBlog){
      setBlogs(blogs.concat(savedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  if(user === null){
    return (
      loginForm()
    )
  }
  else{
    return (
      blogsList()
    )
  }
}

export default App