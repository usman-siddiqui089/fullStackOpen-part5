import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlog'
import LoginForm from './components/Login'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    type: null
  })
  const blogFormRef = useRef()

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
      <Notification message={notification.message} type={notification.type}/>
      <LoginForm loginHandler={handleLogin}/>
    </>
  )

  const blogsList = () => (
    <>
      <div>
        <h2>blogs</h2>
        <Notification message={notification.message} type={notification.type}/>
        <p>
          {user.username} is logged in
          <button onClick={handleLogout}>Logout</button>
        </p>
        <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
          <NewBlogForm createBlog={addBlog}/>
        </Togglable>
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
  
  const handleLogin = async (userCred) => {
    //event.preventDefault()
    try {
      const user = await loginService.login(userCred)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      // setUsername('')
      // setPassword('')
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

  const addBlog = async (blogObj) => {
    blogFormRef.current.toggleVisibility()
    const savedBlog = await blogService.create(blogObj)
    if(savedBlog){
      setBlogs(blogs.concat(savedBlog))
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