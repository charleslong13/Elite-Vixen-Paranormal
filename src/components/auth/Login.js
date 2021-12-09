import React, { useState } from "react"

import { Link, useHistory } from "react-router-dom";
import useSimpleAuth from "../hooks/useSimpleAuth";
import "./Login.css"


export const Login = () => {
    const [credentials, syncAuth] = useState({
        email: "",
        remember: false
    })
    const { login } = useSimpleAuth()
    const history = useHistory()

    // Simplistic handler for login submit
    const handleLogin = (e) => {
        e.preventDefault()
        const storage = credentials.remember ? localStorage : sessionStorage

        /*
            For now, just store the email and userName that
            the customer enters into local storage.
        */
        console.log("*** Initiate authentication ***")
        login(credentials.email, credentials.userName, storage)
            .then(success => {
                if (success) {
                    console.log("*** Rerouting to root URL ***")
                    history.push("/")
                }
            })
    }

    const handleUserInput = (event) => {
        const copy = {...credentials}
        copy[event.target.id] = event.target.value
        syncAuth(copy)
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Elite Vixen Paranormal</h1>
                    <h2 className="h3 mb-3 font-weight-normal">Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email" onChange={handleUserInput}
                            id="email"
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <input
                            onChange={
                                (event) => {
                                    const copy = {...credentials}
                                    if (event.target.value === "on") {
                                        copy.remember = true
                                    }
                                    else {
                                        copy.remember = false
                                    }
                                    syncAuth(copy)
                                }
                            }
                            defaultChecked={credentials.remember}
                            type="checkbox" name="remember" id="remember" />
                        <label htmlFor="remember"> Remember Me </label>
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                    </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
export default Login




















// import React, { useRef, useState } from "react"
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom"
// import "./Login.css"

// export const Login = () => {
//     const [email, set] = useState("")
//     const existDialog = useRef()
//     const history = useHistory()

//     const existingUserCheck = () => {
//         return fetch(`http://localhost:8088/users?email=${email}`)
//             .then(res => res.json())
//             .then(user => user.length ? user[0] : false)
//     }

//     const handleLogin = (e) => {
//         e.preventDefault()
//         existingUserCheck()
//             .then(exists => {
//                 if (exists) {
//                     localStorage.setItem("evp_user", exists.id)
//                     history.push("/")
//                 } else {
//                     existDialog.current.showModal()
//                 }
//             })
//     }

//     return (
//         <main className="container--login">
//             <dialog className="dialog dialog--auth" ref={existDialog}>
//                 <div>User does not exist</div>
//                 <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
//             </dialog>

//             <section>
//                 <form className="form--login" onSubmit={handleLogin}>
//                     <h1>Elite Vixen Paranormal</h1>
//                     <h2>Please sign in</h2>
//                     <fieldset>
//                         <label htmlFor="inputEmail"> Email address </label>
//                         <input type="email"
//                             onChange={evt => set(evt.target.value)}
//                             className="form-control"
//                             placeholder="Email address"
//                             required autoFocus />
//                     </fieldset>
//                     <fieldset>
//                         <button type="submit">
//                             Sign in
//                         </button>
//                     </fieldset>
//                 </form>
//             </section>
//             <section className="link--register">
//                 <Link to="/register">Not a member yet?</Link>
//             </section>
//         </main>
//     )
// }

