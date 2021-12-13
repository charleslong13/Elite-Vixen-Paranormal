import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"


export const RequestList = () => {
    const [requests, setRequests] = useState([]) // State variable for current request object

    const history = useHistory()
//use effect that runs once upon initialization and fetches our requests array of request objects and then uses setRequests to store them in our requests variable 
    useEffect(
        () => {
            fetch("http://localhost:8088/requests")
                .then(res => res.json())
                .then((data) => {
                    setRequests(data)
                })
        },
        []
    )
//below we define a function and set id as the parameter because we will be passing it a post Id, it finds the request object via the id and deletes it from the array 
//then it refetches the requests array, sets it using setsRequests, and utilizes useHistory to return the user to the submittedRequests page with the current array of request objects
    const deleteRequest = (id) => {
        fetch(`http://localhost:8088/requests/${id}`, { method: 'DELETE' })
            .then(() => {
                fetch(`http://localhost:8088/requests`)
            
            .then(res => res.json())
            .then((data) => {
                setRequests(data)
            })
            .then(() => {
                history.push("/submittedRequests")
            })})
    }

    return (
        <>
           {
                requests.map(
                    (request) => {
                        //setting the key to the request object Id to return the correct, individual request object 
                        return <p key={`request--${request.id}`}> 
                        <p>{request.name} submitted an investigation request for {request.requestedDate}</p>
                        <p>Description: {request.description}</p>
                        <p>Requested Investigation Address: {request.address}</p>
                        <p>Property Owner: {JSON.stringify(request.propertyOwner)}</p>
                        <p>Contact number: {request.number}</p>
                        
                        
                    <button onClick={() => deleteRequest(request.id)}>Delete</button>
            
                         </p>
                    }
                )
            }
        </>
    )}