import React, { useState, useEffect } from "react";
import { setDoc, collection, doc } from "firebase/firestore";
import { db, auth } from "../../Firebase.config";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../Models/IUser";
import { UserService } from "../../Services/UserService";
import "./Profile.css";

function ProfileSettings(props: { isAuth: boolean }) {
  const [fullName, setFullName] = useState("Mike Chavez");
  const [email, setEmail] = useState("macof2012@gmail.com");
  const [birthday, setBirthday] = useState("11/12/2020");


  const usersCollectionRef = collection(db, "users");
  let navigate = useNavigate();

  const createSettings = async () => {
    await setDoc(doc(usersCollectionRef, auth.currentUser!.uid), {
      fullName,
      email,
      birthday,
    });
    navigate("/");
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      var user:IUser | undefined = await UserService.getCurrentUser();
      if(user)
      {
        setFullName(user.fullName);
        setBirthday(user.birthday);
        setEmail(user.email);
      }
    };
    getCurrentUser();
    if (!props.isAuth) {
      navigate("/login");
    }
  }, []);

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
                  value={fullName}
                  onChange={(event) => {
                    setFullName(event.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="email"
                  className=""
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div>
                <input
                  type="date"
                  className=""
                  id="birthday"
                  placeholder="Birthday"
                  value={birthday}
                  onChange={(event) => {
                    setBirthday(event.target.value);
                  }}
                />
              </div>
              <div className="row mt-5">
                <div className="col">
                  <input type="button" value="Save" onClick={createSettings} />
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
