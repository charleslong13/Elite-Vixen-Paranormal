// import { useEffect, useState } from "react"



// export const CurrentUser = () => {
//     const [users, setCurrentUser] = useState([])


//     useEffect(
//         () => {
//             const getCurrentUser = () => { 
//                 return fetch("http://localhost:8088/users")
//                 .then(res => res.json())
//                .then (user => user.find(user => localStorage.getItem("evp_user") === user.id)
//                 })
//         },
//         []
//     )
//     debugger
//     return (
//         users.find(user => localStorage.getItem("evp_user") === user.id 

//         )




//         //get the current user by finding the value of evp_user in local storage
//         // then iterate through users to find the matching id 
//         //then if the id and local storage value are the same
//         // AND the user object with the matching id has a employee value of true then render option 1
//         // if the currently logged in user cannot be found or is not an employee then render option 2
//         //  CurrentUser.employee === true


//     )
// }
