import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomeLogin from "./Pages/HomeLogin";
import HomeFeed from "./Pages/HomeFeed";
import Profile from "./Pages/Profile/Profile";
import ProfileSettings from "./Pages/Profile/ProfileSettings";
import ProfileNotReady from "./Pages/Profile/ProfileNotReady";
import Login from "./Pages/Login";

import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./Services/FirebaseService"; //TODO
import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "HomeLogin";
    }).catch((error) => {
      console.error("error")
    });
  };

  return (
    <Router>
      <nav>
        {!isAuth ? (
          <>
            <Link className="LogInOutButton" to="/Login">
              {" "}
              Login{" "}
            </Link>
          </>
        ) : (
          <>
            <Link to="/HomeFeed"> Feed </Link>
            <Link to="/Profile/Settings"> Your Profile </Link>
            <button className="LogInOutButton" onClick={signUserOut}>
              {" "}
              Log Out
            </button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<HomeLogin setIsAuth={setIsAuth} />} />
        <Route path="/HomeLogin" element={<HomeLogin setIsAuth={setIsAuth} />} />
        <Route path="/HomeFeed" element={<HomeFeed isAuth={isAuth} />} />
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
        <Route path="Login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
