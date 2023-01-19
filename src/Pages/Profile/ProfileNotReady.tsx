import React from "react";
import "./Profile.css";

function ProfileNotReady(props: { isAuth: boolean }) {
  return (
    <div className="container content clear-fix">
      <h2 className="mt-5 mb-5">Not Ready</h2>
      <div className="row"></div>
    </div>
  );
}

export default ProfileNotReady;
