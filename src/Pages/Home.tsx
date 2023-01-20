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
      <h1> Home </h1>
      {users.map(function (user, index) {
        return <h2 key={index}>{user.fullName}</h2>;
      })}
    </div>
  );
}
export default Home;
