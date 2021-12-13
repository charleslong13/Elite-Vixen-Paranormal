import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

export const Post = () => {
    const [post, assignPost] = useState({})  // State variable for current post object

    const { postId } = useParams()  // Variable storing the route parameter
    const history = useHistory()


    // Fetch the individual post when the parameter value changes
    useEffect(
        () => {
            return fetch(`http://localhost:8088/posts/${postId}?_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    assignPost(data)
                })

        },
        [postId]  // Above function runs when the value of postId change
    )



    // Function to invoke when a user has input all of their edits 
    const setNewPost = (evt) => {

        // Construct a new object to replace the existing one in the API
        const updatedPost = {
            userId: parseInt(localStorage.getItem("evp_user")),
            title: post.title,
            imageUrl: post.imageUrl,
            description: post.description,
            timestamp: post.timestamp,
        }

        // Perform the PUT HTTP request to replace the resource
        return fetch(`http://localhost:8088/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPost)
        })
            .then(() => {
                history.push("/posts")
            })
    }

    return (
        <>
            <center><h2>Post Details</h2></center>
            <section className="post">
                <center><p><h3 className="post__description">{post.title}</h3>
                <img className="postImage" src={post.imageUrl} />
                <div className="post__user">Submitted by {post.user?.name}</div></p>
                <div className="post__description">{post.description}</div></center>
                <div className="post__title">Edit your title
                    <input  id="title"  onChange={
                            (evt) => {
                                //creates a copy of post state
                                const copy = { ...post }
                                copy.title = evt.target.value
                                assignPost(copy)
                            }
                         } required autoFocus
                        type="text"
                        className="form-control" >
                    </input>
                <div className="post__url">Edit your image/gif url
                    <input  id="edit__url"  onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.imageUrl = evt.target.value
                                assignPost(copy)
                            }
                         } required autoFocus
                        type="text"
                        className="form-control" >
                    </input>
                <div className="post__description">Edit your description
                    <input  id="edit__description"  onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.description = evt.target.value
                                assignPost(copy)
                            }
                         } required autoFocus
                        type="text"
                        className="form-control" >
                    </input>
                <div className="post__date">Update your new post's submission date 
                    <input  id="edit__date"  onChange={
                            (evt) => {
                                const copy = { ...post }
                                copy.timestamp = evt.target.value
                                assignPost(copy)
                            }
                         } required autoFocus
                        type="text"
                        className="form-control" >
                    </input>
                    <button className="submitEdit" onClick={setNewPost}>Submit Edit</button>
                    </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}
