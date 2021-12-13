import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <nav className="navbar">
            <li className="navbar_item navigation__name">
                <Link className="navbar__link" to="/posts">Home</Link>
            </li>
            <li className="navbar_item navigation__about">
                    <Link className="navbar__link" to="/about">About</Link>
          </li>
          <li className="navbar_item navigation__contact">
                    <Link className="navbar__link" to="/contact">Contact Us</Link>
            </li>
            <li className="navbar_item navigation__requestForm">
                    <Link className="navbar__link" to="/requestForm">Investigation Request</Link>
            </li>
            <li className="navbar_item navigation__logout">
                <Link className="navbar__link" to="#"
                onClick={
                    () => {
                        localStorage.removeItem("evp_user")
                    }
                }>
                    Logout
                </Link>
            </li>
        </nav>
    )
}
