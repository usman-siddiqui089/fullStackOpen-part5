import React from 'react'

const NewBlogForm = ({titleVal, authorVal, urlVal, onTitleChange, onAuthorChange, onUrlChange, onSubmitHandler}) => {
    return (
        <>
            <form onSubmit={onSubmitHandler}>
                <div>
                    Title:
                    <input 
                    type="text"
                    name="Title"
                    value={titleVal}
                    onChange={onTitleChange}
                    />
                </div>
                <div>
                    Author:
                    <input 
                    type="text"
                    name="Author"
                    value={authorVal}
                    onChange={onAuthorChange}
                    />
                </div>
                <div>
                    Blog URL:
                    <input 
                    type="text"
                    name="Url"
                    value={urlVal}
                    onChange={onUrlChange}
                    />
                </div>
                <button type='submit'>Add</button>
            </form>
        </>
    )
}

export default NewBlogForm