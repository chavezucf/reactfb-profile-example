import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Profile.css";

function Profile(props: { isAuth: boolean }) {
  return (
    <div
      className="container-fluid main"
      style={{paddingLeft: "0px" }}
    >
      <div className="row">
        <div className="col-md-3 d-none d-md-block ">
          <div className="container-fluid nav sidebar flex-column">
            <Link to="/Profile/Settings" className="nav-link active mt-5"> <i className="far fa-user-circle"></i> Profile </Link>
            <Link to="/Profile/Notifications" className="nav-link"> <i className="far fa-bell"></i> Notifications </Link>
            <Link to="/Profile/BillingInfo" className="nav-link"> <i className="far fa-file-alt"></i> Billing Info </Link>
            <Link to="/Profile/General" className="nav-link"> <i className="fas fa-cogs"></i> General </Link>
          </div>
        </div>
        <div className="col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Profile;
