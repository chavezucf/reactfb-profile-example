import { auth } from "./FirebaseService";
import { signInWithEmailAndPassword } from "firebase/auth";

export class LoginService {
  static IsLogin: boolean = false;
  static SignIn = async (email: string, password: string) => {
    var isLogin = false;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        isLogin = true;
      })
      .catch((error) => {
        console.log("error" + error);
        isLogin = false;
      });

    LoginService.IsLogin = isLogin;
    return isLogin;
  };
}
