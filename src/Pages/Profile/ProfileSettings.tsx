import React, { useState, useEffect } from "react";
import { IUser } from "../../Models/IUser";
import { UserService } from "../../Services/UserService";
import "./Profile.css";

function ProfileSettings(props: { isAuth: boolean }) {
  const [showImgPicker, setShowImgPicker] = useState(false);
  const [user, setUser] = useState<IUser>();
  const [file, setFile] = useState<File>();

  const updateUser = async () => {
    await UserService.setUser( user!.fullName,  user!.email, user!.birthday);
  };

  const setUserImage = async () => {
    if(file !== undefined )
      await UserService.setUserImage(file, user!.userId);
    else 
      console.error("No file");
  };

  useEffect(() => {
    const getCurrentUser = async () => {
      var user: IUser | undefined = await UserService.getCurrentUser();
      if (user) {
        setUser(user);
      }
    };
    getCurrentUser();
  });

  return (
    <div className="container content clear-fix">
      <h2 className="mt-5 mb-5">Profile Settings</h2>
      { user ==null ? (<h2>loading</h2>) : (<div className="row">
        <div className="col-md-3">
          <div className="d-inline">
            <img src={user?.imageUrl} style={{ width: "125px" }} />
            <div className="pl-2 mt-2">
              {showImgPicker ? (
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={(event) => {
                      setFile(event!.target!.files![0]);
                    }}
                  />
                  <button
                    className="btn mt-3 mr-3"
                    style={{
                      color: "white",
                      backgroundColor: "#56baed",
                    }}
                    onClick={setUserImage}
                  >
                    Save
                  </button>
                  <button
                    className="btn  mt-3 ml-3"
                    style={{
                      marginLeft: "20px",
                      color: "#8f9096",
                      fontWeight: "600",
                    }}
                    onClick={() => {
                      setShowImgPicker(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  className="btn"
                  style={{
                    color: "#8f9096",
                    fontWeight: "600",
                  }}
                  onClick={() => {
                    setShowImgPicker(true);
                  }}
                >
                  Edit Picture
                </button>
              )}
            </div>
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
                  value={user?.fullName}
                  onChange={(event) => {
                    user!.fullName = event.target.value;
                    setUser(user);
                  }}
                />
              </div>
              <div>
                <input
                  type="email"
                  className=""
                  id="email"
                  placeholder="Email"
                  value={user?.email}
                  onChange={(event) => {
                    user!.email = event.target.value;
                    setUser(user);
                  }}
                />
              </div>
              <div>
                <input
                  type="date"
                  className=""
                  id="birthday"
                  placeholder="Birthday"
                  value={user?.birthday}
                  onChange={(event) => {
                    user!.birthday = event.target.value;
                    setUser(user);
                  }}
                />
              </div>
              <div className="row mt-5">
                <div className="col">
                  <input type="button" value="Save" onClick={updateUser} />
                </div>
                <div className="col">
                  <button
                    className="btn"
                    style={{
                      color: "#8f9096",
                      fontWeight: "600",
                      padding: "15px 80px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>)}
    </div>
  );
}

export default ProfileSettings;
