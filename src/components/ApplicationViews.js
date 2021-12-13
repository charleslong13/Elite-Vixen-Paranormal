import React from "react"
import { Route } from "react-router-dom"
import { AboutUs } from "./about/AboutUs"
import { ContactUs } from "./contact/ContactUs"
import { Post } from "./feed/Post"
import { PostForm } from "./feed/PostEntry"
import { PostList } from "./feed/PostList"
import { RequestForm } from "./request/RequestForm"
import { RequestList } from "./request/RequestList"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/requestForm">
                <RequestForm />
            </Route>
            <Route exact path="/submittedRequests">
                <RequestList />
            </Route>
            <Route exact path="/contact">
                <ContactUs />
            </Route>
            <Route exact path="/about">
                <AboutUs />
            </Route>
            <Route exact path="/posts">
                <PostList />
            </Route>
            <Route exact path="/posts/:postId(\d+)">
                <Post />
            </Route>
            <Route exact path="/posts/create">
                <PostForm />
            </Route>
           
        </>
    )
}
