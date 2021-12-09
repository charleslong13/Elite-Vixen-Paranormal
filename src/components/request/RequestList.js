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

    // useEffect(() => {
    //     /*
    //         1. Use .map() to get the specialty of each employee
    //         2. Then update a state variable to be a comma-separated string
    //             (e.g. "iPhone, Printers, ...")
    //     */
    //     const completedRequest = requests.map(request => request.description)
    //     setRequests(completedRequest)
    // }, [requests])

    return (
        <>
           {
                requests.map(
                    (request) => {
                        return <p key={`request--${request.id}`}> 
                        <p>{request.name} submitted an investigation request for {request.requestedDate}</p>
                        <p>Description: {request.description}</p>
                        <p>Requested Investigation Address: {request.address}</p>
                        <p>Property Owner: {request.propertyOwner}</p>
                        <p>Contact number: {request.number}</p>
                        <p>Request submitted on: {request.timestamp}</p>
                        
                         </p>
                    }
                )
            }
        </>
    )}