import React, { useEffect, useState } from "react";
import { IUser } from "../Models/IUser";
import { UserService } from "../Services/UserService";

function HomeFeed(props: { isAuth: boolean }) {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await UserService.GetUsers());
    };
    getUsers();
  }, []);
  return (
    <div>
      <div className="wrapper">
        {users.map(function (user,index) {
          return <div key={index} id="formContent" className="mt-5 pt-2">
            <div className="d-inline">
              <img
                src={user.imageUrl}
                style={{ width: "50px" }}
              />
            </div>
            <h2>{user.fullName}</h2>
            <ul>
              <li>{user.email}</li>
              <li>{user.birthday}</li>
            </ul>
          </div>;
        })}

      </div>
    </div>
  );
}
export default HomeFeed;
