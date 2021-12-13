import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"


export const RequestList = () => {
    const [requests, setRequests] = useState([])

    const history = useHistory()

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