import React, { useState } from "react"

import { useHistory} from "react-router-dom"

export const PostForm = () => {

    const [post, createPost] = useState({
        userId: "",
        title: "",
        imageUrl: "",
        description: "",
        timestamp: "",
    })


const history = useHistory()

const savePost = (evt) => {
    evt.preventDefault()

    const newPost = {
        userId: parseInt(localStorage.getItem("evp_user")),
        title: post.title,
        imageUrl: post.imageUrl,
        description: post.description,
        timestamp: post.timestamp,
    }
    const fetchOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    }

    return fetch("http://localhost:8088/posts?_expand=user", fetchOption)
        .then(() => {
                history.push("/posts")
        })
}


return (
    <form className="requestForm">
                   
    <h2 className="requestForm__title">New Post</h2>

    <fieldset>
        <div className="form-group">
            <label htmlFor="postTitle">Title:</label>
            <input
                onChange={
                    (evt) => {
                        //creates a copy of request state
                        const copy = { ...post }
                        copy.title = evt.target.value
                        createPost(copy)
                    }
                } 
                required autoFocus
                type="text"
                className="form-control"
                placeholder="What is the title of your post?"
                />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="imageUrl">Please input you Image/gif url:</label>
            <input 
                onChange={
                    (evt) => {
                        //creates a copy of request state
                        const copy = { ...post }
                        copy.imageUrl = evt.target.value
                        createPost(copy)
                    }
                } required autoFocus
                type="url"
                className="form-control" 
                 />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input 
                onChange={
                    (evt) => {
                        //creates a copy of request state
                        const copy = { ...post }
                        copy.description = evt.target.value
                        createPost(copy)
                    }
                } required autoFocus
                type="text"
                className="form-control"
                  />
        </div>
    </fieldset>
    <fieldset>
        <div className="form-group">
            <label htmlFor="date">Date Posted:</label>
            <input 
                onChange={
                    (evt) => {
                        //creates a copy of request state
                        const copy = { ...post }
                        copy.timestamp = evt.target.value
                        createPost(copy)
                    }
                } required autoFocus
                type="text"
                className="form-control"
                  />
        </div>
    </fieldset>
  
   
   
    <button onClick={savePost} className="btn btn-primary" >
        Submit Post! 
    </button>
</form>
)
            }

    




        
    

   
     
     
