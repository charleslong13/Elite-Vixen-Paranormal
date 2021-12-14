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
        }, [] //empty dependency array so this useEffect will only run once initially 
    )
    const deletePost = (id) => {
        fetch(`http://localhost:8088/posts/${id}`, { method: 'DELETE' }) //gets a specific post object via id and deletes it from the database
            .then(() => {
                fetch(`http://localhost:8088/posts?_expand=user`) //after its deleted it fetches all of our remaining posts

                    .then(res => res.json()) //converts the response (json encoded string) to javascript 
                    .then((data) => {
                        updatePosts(data) //takes the response and calls our setter function to set the remaining posts' state 
                    })
                    .then(() => {
                        history.push("/posts") //using history.push to navigate the user back to the posts page 
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
                            <img className="postImage" src={completedPost.imageUrl} alt="" /><p>
                            </p><div className="postData">
                                {completedPost.user?.id === parseInt(localStorage.getItem("evp_user")) //using a ternary so that the title will be displayed as a link only if the post was submitted by the current user, if the post was made by someone else it just displays as a string
                                    ?
                                    <Link to={`/posts/${completedPost.id}`}>{completedPost.title}</Link> :
                                      completedPost.title }
                                <p> {completedPost.description}</p>
                                <p>Posted by: {completedPost.user?.name}</p>
                                <p>{completedPost.timestamp}</p>
                                {completedPost.user?.id === parseInt(localStorage.getItem("evp_user")) //using a ternary to only display a delete button on posts made by the current user, if someone else created the post it just renders a blank string
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