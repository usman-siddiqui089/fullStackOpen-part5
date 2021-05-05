import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlog'
import LoginForm from './components/Login'
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
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })

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

  const setUsernameVal = (event) => {
    setUsername(event.target.value)
  }

  const setPasswordVal = (event) => {
    setPassword(event.target.value)
  }

  const loginForm = () => (
    <>
      <h2>Login to Application</h2>
      <Notification message={notification.message} type={notification.type}/>
      <LoginForm usernameVal={username} passwordVal={password} onUsernameChange={setUsernameVal} onPasswordChange={setPasswordVal} onSubmitHandler={handleLogin}/>
    </>
  )

  const setTitleVal = (event) => {
    setTitle(event.target.value)
  }

  const setAuthorVal = (event) => {
    setAuthor(event.target.value)
  }

  const setUrlVal = (event) => {
    setUrl(event.target.value)
  }

  const blogsList = () => (
    <>
      <div>
        <h2>blogs</h2>
        <Notification message={notification.message} type={notification.type}/>
        <p>
          {user.username} is logged in
          <button onClick={handleLogout}>Logout</button>
        </p>
        <NewBlogForm titleVal={title} urlVal={url} authorVal={author} onTitleChange={setTitleVal} onAuthorChange={setAuthorVal} onUrlChange={setUrlVal} onSubmitHandler={addBlog}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )

  const displayNotification  = (type, message) => {
    const notification = {
      message: message,
      type: type
    }
    setNotification(notification)
    setTimeout(() => {
      setNotification({
        message: null,
        type: null
      })
    }, 5000);
  }
  
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
      const message = 'Sorry! Credentials not found. Try again'
      const type = 'error'
      displayNotification(type, message)
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
      const message = `a new blog ${savedBlog.title} by ${savedBlog.author} added successfully!`
      const type = 'success'
      displayNotification(type, message)
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