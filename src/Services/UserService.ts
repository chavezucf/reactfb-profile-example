import { IUser } from "../Models/IUser";
import { getDocs, collection, setDoc } from "firebase/firestore";
import { db, auth } from "../Firebase.config";

import { doc, getDoc } from "firebase/firestore";

export class UserService {
  private static UsersCollectionRef = collection(db, "users");
  static setUser = async (fullName: string, email: string, birthday: string) => {
    await setDoc(doc(UserService.UsersCollectionRef, auth.currentUser!.uid), {
      fullName,
      email,
      birthday,
    })
  };
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
