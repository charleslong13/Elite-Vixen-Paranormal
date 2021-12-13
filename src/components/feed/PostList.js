import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export const PostList = () => {
    const [posts, updatePosts] = useState([])

    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/posts?_expand=user")
            .then(res => res.json())
            .then((data) => {
                updatePosts(data)
            })
        }, []
    )

    return (
        <>
        <div>
         <center>   <button onClick={() => history.push("/posts/create")}>Create a new post</button></center>
        </div>
        { 
        posts.map(
            (completedPost) => {
               
                return <center><div class="postList"><div key={`post--${completedPost.id}`}>
                <img class="postImage" src={completedPost.imageUrl} /><p>
                </p><div class="postData">
                    <p>Title: {completedPost.title}</p>
                    <p>Description: {completedPost.description}</p>
                    <p>Posted by: {completedPost.user?.name}</p>
                </div>
                
                </div>
                </div>
                </center>
            }
        )
        }
        </>
    )


}