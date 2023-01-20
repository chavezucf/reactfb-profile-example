import React, { useEffect, useState } from "react";
import { IUser } from "../Models/IUser";
import { UserService } from "../Services/UserService";

function Home(props: { isAuth: boolean }) {
  var allUsers: IUser[] = [];
  const [users, setUsers] = useState(allUsers);

  useEffect(() => {
    const getUsers = async () => {
      setUsers(await UserService.getUsers());
    };
    getUsers();
  }, []);
  return (
    <div>
      <div className="wrapper">
        {users.map(function (user, index) {
          return <div id="formContent" className="mt-5 pt-2">
            <h2 key={index}>{user.fullName}</h2>
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
export default Home;
