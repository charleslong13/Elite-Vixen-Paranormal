import React from "react"
import { Route } from "react-router-dom"
import { AboutUs } from "./about/AboutUs"
import { ContactUs } from "./contact/ContactUs"
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
        </>
    )
}
