import React, {useState} from 'react'

const NewBlogForm = ({createBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = async (event) => {
        event.preventDefault()
        const newBlogData = {
          title: title,
          author: author,
          url: url
        }
        createBlog(newBlogData)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <>
            <form onSubmit={addBlog}>
                <div>
                    Title:
                    <input 
                    type="text"
                    name="Title"
                    value={title}
                    onChange={({target}) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:
                    <input 
                    type="text"
                    name="Author"
                    value={author}
                    onChange={({target}) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Blog URL:
                    <input 
                    type="text"
                    name="Url"
                    value={url}
                    onChange={({target}) => setUrl(target.value)}
                    />
                </div>
                <button type='submit'>Add</button>
            </form>
        </>
    )
}

export default NewBlogForm