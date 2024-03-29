import { IUser } from "../Models/IUser";
import { getDocs, collection, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, auth, storage } from "./FirebaseService";
import { MockUsers } from "./MockUserData"

import { doc, getDoc } from "firebase/firestore";
const DEFAULT_IMG = "https://cdn-icons-png.flaticon.com/512/1160/1160428.png";
export class UserService {
  private static UsersCollectionRef = collection(db, "users");
  static GetMockUsers = () => {
    var users: IUser[] = MockUsers
    return users;
  };
  static GetUsers = async (): Promise<IUser[]> => {
    var users: IUser[] = [];
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach(async (doc) => {
      var user = doc.data() as IUser;
      if (user.imageLocation && user.imageLocation !== "")
        user.imageUrl = DEFAULT_IMG;
      //user.imageUrl = await UserService.GetUserImage(user.userId);
      else {
        user.imageUrl = DEFAULT_IMG;
        user.imageLocation = "";
      }
      users.push(user);
    });
    return new Promise<IUser[]>((resolve) => {
      resolve(users);
    });
  };

  static GetCurrentUser = async (): Promise<IUser> => {
    const docRef = doc(db, "users", auth.currentUser!.uid);
    const docSnap = await getDoc(docRef);
    var user: IUser;

    if (docSnap.exists()) {
      user = docSnap.data() as IUser;
      if (user.imageLocation && user.imageLocation !== "")
        //user.imageUrl = DEFAULT_IMG;
        user.imageUrl = await UserService.GetUserImage(user.userId);
      else
        user.imageUrl = DEFAULT_IMG;
      return user;
    } else {
      console.log("No such document!");
    }
    return new Promise<IUser>((resolve) => {
      resolve(user);
    });
  };

  static GetUserImage = async (userId: string) => {
    const pathReference = ref(storage, "userImages/" + userId + ".png");
    var userUrl = "";
    await getDownloadURL(pathReference)
      .then((url) => {
        userUrl = url;
      })
      .catch((error) => {
        userUrl = DEFAULT_IMG;
        console.error(error);
      });
    return userUrl;
  };

  static SetUser = async (
    fullName: string,
    email: string,
    birthday: string,
    imageLocation: string = "imageLocation"
  ) => {
    var userId = auth.currentUser!.uid;
    await setDoc(doc(UserService.UsersCollectionRef, userId), {
      userId,
      fullName,
      email,
      birthday,
      imageLocation,
    });
  };

  static SetUserImage = async(file: File, userId: string) => {
    const pathReference = ref(storage, "userImages/" + userId + ".png");
    uploadBytes(pathReference, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  };
}
