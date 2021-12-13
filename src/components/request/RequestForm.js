import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useHistory} from "react-router-dom"



export const RequestForm = () => {
    const [users, setUsers] = useState()
    const [request, createRequest] = useState({
        userId: "",
        name: "",
        number: 0,
        address: "",
        requestedDate: "",
        description: "",
        propertyOwner: false,
        timestamp: 12345,
    })

    const history = useHistory()
    

    const saveRequest = (evt) => {
        evt.preventDefault()

        const newRequest = {
            userId: parseInt(localStorage.getItem("evp_user")),
            name: request.name,
            number: request.number,
            address: request.address,
            requestedDate: request.requestedDate,
            description: request.description,
            propertyOwner: request.propertyOwner,
            timestamp: Date.now().toString(),
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRequest)
        }

        return fetch("http://localhost:8088/requests?_expand=user", fetchOption)
            .then(() => {
                    history.push("/posts")
            })
    }
useEffect(()=> {
    getCurrentUser()
}, [])

const currentUser = parseInt(localStorage.getItem("evp_user"))
    const getCurrentUser = () => { 
        return fetch(`http://localhost:8088/users?id=${currentUser}`)
        .then(res => res.json())
        .then(response => setUsers(response[0])) //the response we get back is an array with only one object, used the first index of the array to access it so that dot notation can used used below to access the employee property for the ternary statement 
        
    }
        
    

    return (
        <form className="requestForm">
            {/* using optional chaining because it cannot read the employee property initially */}
            { users?.employee
             ? <>
                             <Link to="/submittedRequests" className="link--requests" >
                                 View Requests
                             </Link>
                         </> : ""}

                         
            <h2 className="requestForm__title">New Investigation Request</h2>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        onChange={
                            (evt) => {
                                //creates a copy of request state
                                const copy = { ...request }
                                copy.name = evt.target.value
                                createRequest(copy)
                            }
                        } 
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Tell us about yourself"
                        />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input 
                        onChange={
                            (evt) => {
                                const copy = { ...request }
                                copy.number = evt.target.value
                                createRequest(copy)
                            }
                        } required autoFocus
                        type="text"
                        className="form-control" 
                         />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="requestedDate">Address for investigation location:</label>
                    <input 
                        onChange={
                            (evt) => {
                                const copy = { ...request }
                                copy.address = evt.target.value
                                createRequest(copy)
                            }
                        } required autoFocus
                        type="text"
                        className="form-control"
                        
                          />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="requestedDate">Requested Investigation Date:</label>
                    <input 
                        onChange={
                            (evt) => {
                                const copy = { ...request }
                                copy.requestedDate = evt.target.value
                                createRequest(copy)
                            }
                        }required autoFocus
                        type="text"
                        className="form-control"
                          />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="requestedDate">Description/ Reason for investigation:</label>
                    <input 
                        onChange={
                            (evt) => {
                                const copy = { ...request }
                                copy.description = evt.target.value
                                createRequest(copy)
                            }
                        } required autoFocus
                        type="text"
                        className="form-control" 
                         />
                </div>
                </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="propertyOwner">Are you the owner of the property?</label>
                    <input type="checkbox"
                        onChange={
                            (evt) => {
                                const copy = { ...request }
                                copy.propertyOwner = evt.target.checked
                                createRequest(copy)
                            }
                        }  />
                </div>
            </fieldset>
            <button onClick={saveRequest} className="btn btn-primary" >
                Submit Request 
            </button>
        </form>
    )
}
