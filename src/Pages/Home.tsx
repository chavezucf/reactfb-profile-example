import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase.config";

function Home(props: { isAuth: boolean }) {

  interface User {
    author: {
      id: string;
      email: string;
    };
    email: string;
    birthday: string;
    fullName: string;
  }
  var allUsers: User[] = [];


  const [users, setUsers] = useState(allUsers);

  useEffect(() => {
    const getUsers = async () => {
      var users: User[] = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        var user = doc.data() as User;
        users.push(user);
      });
      setUsers(users);
    };
    getUsers();
  }, []);

  const deleteUser = async (id: number) => {
    /*const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);*/
  };
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
