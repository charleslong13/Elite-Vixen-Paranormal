import React from "react"
import { Route } from "react-router-dom"
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
        </>
    )
}
