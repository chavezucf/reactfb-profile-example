import { IUser } from "../Models/IUser";
import { getDocs, collection } from "firebase/firestore";
import { db, auth } from "../Firebase.config";

import { doc, getDoc } from "firebase/firestore";

export class UserService {
  static getUsers = async () => {
    var users: IUser[] = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      var user = doc.data() as IUser;
      users.push(user);
    });
    return users;
  };

  static getCurrentUser = async () => {
    const docRef = doc(db, "users", auth.currentUser!.uid,);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
       return docSnap.data() as IUser;
    } else {
      console.log("No such document!");
    }
  };
}
