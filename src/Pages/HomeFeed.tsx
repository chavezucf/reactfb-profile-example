import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import { IUser } from "../Models/IUser";
import { UserService } from "../Services/UserService";

function HomeFeed(props: { isAuth: boolean }) {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    UserService.GetUsers()
      .then((users) => {
        setUsers(users);
        setTimeout(function () {
          setLoading(false);
        }, 250);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  });
  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="wrapper">
          {users.map(function (user, index) {
            return (
              <div key={index} id="formContent" className="mt-5 pt-2">
                <div className="d-inline">
                  <img src={user.imageUrl} style={{ width: "50px" }} />
                </div>
                <h2>{user.fullName}</h2>
                <ul>
                  <li>{user.email}</li>
                  <li>{user.birthday}</li>
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
export default HomeFeed;
