import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
        <p>{user.username} is logged in</p>
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
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      alert('Error! Wrong Credentials')
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