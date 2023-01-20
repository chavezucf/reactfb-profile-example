import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./Pages/Home";
import Profile from "./Pages/Profile/Profile";
import ProfileSettings from "./Pages/Profile/ProfileSettings";
import ProfileNotReady from "./Pages/Profile/ProfileNotReady";
import Login from "./Pages/Login";

import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./Firebase.config";
import "./App.css";
import { wait } from "@testing-library/user-event/dist/utils";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    }).catch((error) => {
      // An error happened.
      console.error("error")
    });
  };

  return (
    <Router>
      <nav>
        <Link to="/"> Home </Link>
        {!isAuth ? (
          <Link className="LogInOutButton" to="/login">
            {" "}
            Login{" "}
          </Link>
        ) : (
          <>
            <Link to="/Profile/Settings"> Your Profile </Link>
            <button className="LogInOutButton" onClick={signUserOut}>
              {" "}
              Log Out
            </button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="Profile" element={<Profile isAuth={isAuth} />}>
          <Route
            path="Settings"
            element={<ProfileSettings isAuth={isAuth} />}
          />
          <Route
            path="Notifications"
            element={<ProfileNotReady isAuth={isAuth} />}
          />
          <Route
            path="BillingInfo"
            element={<ProfileNotReady isAuth={isAuth} />}
          />
          <Route
            path="General"
            element={<ProfileNotReady isAuth={isAuth} />}
          />
        </Route>
        <Route path="login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
