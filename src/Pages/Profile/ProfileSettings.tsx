
import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../Firebase.config";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function ProfileSettings(props: { isAuth: boolean }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createSettings = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser!.displayName, id: auth.currentUser!.uid },
    });
    navigate("/");
  };

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div className="container content clear-fix">
      <h2 className="mt-5 mb-5">Profile Settings</h2>
      <div className="row">
        <div className="col-md-3">
          <div className="d-inline">
            <img
              src="https://randomuser.me/api/portraits/men/74.jpg"
              style={{ margin: "0" }}
            />
            <p className="pl-2 mt-2">
              <a
                href="#"
                className="btn"
                style={{ color: "#8f9096", fontWeight: "600" }}
              >
                Edit Picture
              </a>
            </p>
          </div>
        </div>
        <div className="col-md-9">
          <div className="container">
            <form>
              <div>
                <input
                  type="text"
                  className=""
                  id="fullName"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <input
                  type="email"
                  className=""
                  id="email"
                  placeholder="Email"
                />
              </div>
              <div>
                <input
                  type="password"
                  className=""
                  id="password"
                  placeholder="Password"
                />
              </div>
              <div>
                <input
                  type="date"
                  className=""
                  id="birthday"
                  placeholder="Birthday"
                />
              </div>
              <div className="row mt-5">
                <div className="col">
                  <input type="button" value="Save" />
                </div>
                <div className="col">
                  <input type="button" value="Cancel" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
