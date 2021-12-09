import { useEffect, useState } from "react"


export const RequestList = () => {
    const [requests, setRequests] = useState([])


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
                        <p>Request submitted on: {request.timestamp}</p>
                        
                         </p>
                    }
                )
            }
        </>
    )}