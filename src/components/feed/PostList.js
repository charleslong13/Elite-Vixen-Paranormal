import { useEffect, useState } from "react"
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
            })})
    

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
                    <p>Title: {completedPost.title}</p>
                    <p>Description: {completedPost.description}</p>
                    <p>Posted by: {completedPost.user?.name}</p>
                    <button onClick={() => deletePost(completedPost.id)}>Delete</button>
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