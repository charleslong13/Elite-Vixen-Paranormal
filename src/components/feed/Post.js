import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"

export const Post = () => {
    const [post, assignPost] = useState({})  // State variable for current ticket object

    const { postId } = useParams()  // Variable storing the route parameter
    const history = useHistory()


    // Fetch the individual ticket when the parameter value changes
    useEffect(
        () => {
            return fetch(`http://localhost:8088/posts/${postId}?_expand=user`)
                .then(response => response.json())
                .then((data) => {
                    assignPost(data)
                })

        },
        [postId]  // Above function runs when the value of ticketId change
    )



    // Function to invoke when an employee is chosen from <select> element
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
            <h2>Post Details</h2>
            <section className="post">
                <h3 className="post__description">{post.description}</h3>
                <div className="post__user">Submitted by {post.user?.name}</div>
                <div className="post__employee">Edit your title
                    <input  id="title"  onChange={
                            (evt) => {
                                //creates a copy of request state
                                const copy = { ...post }
                                copy.title = evt.target.value
                                assignPost(copy)
                            }
                         } required autoFocus
                        type="text"
                        className="form-control" >
                    </input>
                    <button className="submitEdit" onClick={setNewPost}>Submit Edit</button>
                </div>
            </section>
        </>
    )
}
