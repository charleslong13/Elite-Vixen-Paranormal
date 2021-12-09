import React from "react"
import { Route } from "react-router-dom"
import { RequestForm } from "./request/RequestForm"

export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/requestForm">
                <RequestForm />
            </Route>
        </>
    )
}
