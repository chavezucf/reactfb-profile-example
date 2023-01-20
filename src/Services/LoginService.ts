import { auth } from "./FirebaseService";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

export class LoginService {
  static SignIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  static SignOut = () => {
    return signOut(auth);
  };
}
