import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import useSimpleAuth from "../hooks/useSimpleAuth";

import "./Login.css"

export const Register = () => {
    const [credentials, syncAuth] = useState({
        name: "",
        email: "",
        address: "",
        employee: false
    })
    const { register } = useSimpleAuth()
    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()

        const newUser = {
            name: `${credentials.name}`,
            email: credentials.email,
            employee: credentials.employee
        }

        register(newUser).then(() => {
            history.push("/")
        })
    }

    const handleUserInput = (event) => {
        const copy = {...credentials}
        copy[event.target.id] = event.target.value
        syncAuth(copy)
    }


    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Elite Vixen Paranormal</h1>
                <fieldset>
                    <label htmlFor="firstName"> Name: </label>
                    <input type="text" onChange={handleUserInput}
                        id="name"
                        className="form-control"
                        placeholder="name"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> Email address </label>
                    <input type="email" onChange={handleUserInput}
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Address: </label>
                    <input type="text" onChange={handleUserInput}
                        id="address"
                        className="form-control"
                        placeholder="name"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <input
                        onChange={
                            (event) => {
                                const copy = { ...credentials }
                                if (event.target.value === "on") {
                                    copy.employee = true
                                }
                                else {
                                    copy.employee = false
                                }
                                syncAuth(copy)
                            }
                        }
                        defaultChecked={credentials.employee}
                        type="checkbox" name="employee" id="employee" />
                    <label htmlFor="employee"> Employee account? </label>
                </fieldset>

                <fieldset>
                    <button type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
        </main>
    )
}
