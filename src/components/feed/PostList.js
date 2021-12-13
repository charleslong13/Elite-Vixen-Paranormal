import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"

export const PostList = () => {
    const [posts, updatePosts] = useState([])


    const history = useHistory()

    useEffect(
        () => {
            fetch(`http://localhost:8088/posts?_expand=user`)
                .then(res => res.json())
                .then((data) => {
                    updatePosts(data)
                })
        }, []
    )
    const deletePost = (id) => {
        fetch(`http://localhost:8088/posts/${id}`, { method: 'DELETE' })
            .then(() => {
                fetch(`http://localhost:8088/posts?_expand=user`)

                    .then(res => res.json())
                    .then((data) => {
                        updatePosts(data)
                    })
                    .then(() => {
                        history.push("/posts")
                    })
            })
    }



    return (
        <>
            <div>
                <center>   <button onClick={() => history.push("/posts/create")}>Create a new post</button></center>
            </div>
            {
                posts.map(
                    (completedPost) => {

                        return <center><div className="postList"><div key={`post--${completedPost.id}`}>
                            <img className="postImage" src={completedPost.imageUrl} /><p>
                            </p><div className="postData">
                                {completedPost.user?.id === parseInt(localStorage.getItem("evp_user"))
                                    ?
                                    <Link to={`/posts/${completedPost.id}`}>{completedPost.title}</Link> :
                                      completedPost.title }
                                <p> {completedPost.description}</p>
                                <p>Posted by: {completedPost.user?.name}</p>
                                <p>{completedPost.timestamp}</p>
                                {completedPost.user?.id === parseInt(localStorage.getItem("evp_user"))
                                    ?
                                    <button onClick={() => deletePost(completedPost.id)}>Delete</button>
                                    : ""}
                            </div>

                        </div>
                        </div>
                        </center>

                    }
                ).reverse() //using .reverse so that the newest post submission shows up at the top of the list
            }
        </>
    )


}