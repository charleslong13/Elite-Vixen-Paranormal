import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Register } from "./auth/Register";
import {Login} from "./auth/Login";


export const EVP = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("evp_user")) {
          return (
            <>
              <NavBar />
              <br></br><h1>Feed</h1>
              <ApplicationViews />
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);
