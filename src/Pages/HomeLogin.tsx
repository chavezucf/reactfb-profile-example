import React, { useEffect, useState } from "react";
import { IUser } from "../Models/IUser";
import { UserService } from "../Services/UserService";
import Login from "./Login";

function HomeLogin({
  setIsAuth,
}: {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    setUsers(UserService.GetMockUsers());
  }, []);
  return (
    <div>
      <div className="wrapper">
        {users.map(function (user, index) {
          return (
            <div key={index} id="formContent" className="mt-5 pt-2">
              <div className="d-inline">
                <img src={user.imageUrl} style={{ width: "50px" }} />
              </div>
              <h2>{user.fullName}</h2>
              <h6>{user.email}</h6>
              <h6>{user.birthday}</h6>
            </div>
          );
        })}
      </div>
      <div className="overlay">
        <Login setIsAuth={setIsAuth} />
      </div>
    </div>
  );
}
export default HomeLogin;
