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
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
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

  const blogsList = () => {
    const sortedBlogs = blogs.sort((firstVal, secondVal) =>  secondVal.likes - firstVal.likes)
    return (
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
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeHandler={updateBlog} removeBlogHandler={removeBlog} currentUserName={user.username}/>
          )}
        </div>
      </>
    )
  }

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
    }, 5000)
  }

  const handleLogin = async (userCred) => {
    try {
      const user = await loginService.login(userCred)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
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

  const updateBlog = async (event) => {
    const id = event.target.value.toString()
    const targetBlog = blogs.find(blog => blog.id === id)
    const updatedBlog = await blogService.update(id, {
      likes: targetBlog.likes + 1
    })
    setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
  }

  const removeBlog = async (event) => {
    const id = event.target.value.toString()
    const targetBlog = blogs.find(blog => blog.id === id)
    const confirmation = window.confirm(`Remove blog ${targetBlog.title} by ${targetBlog.author}`)
    if(confirmation){
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      const message = `${targetBlog.title} by ${targetBlog.author} removed successfully!`
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