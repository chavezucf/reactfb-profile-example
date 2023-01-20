import { IUser } from "../Models/IUser";
const DEFAULT_IMG = "https://cdn-icons-png.flaticon.com/512/1160/1160428.png";

export const MockUsers: IUser[] = [
  {
    userId: "ID1",
    fullName: "Mike Chavez",
    email: "Mike@Chavez.com",
    imageUrl: DEFAULT_IMG,
    birthday: "1/1/2001",
    imageLocation: "",
  },
  {
    userId: "ID2",
    fullName: "Billy Bob",
    email: "Billy@Bob.com",
    imageUrl: DEFAULT_IMG,
    birthday: "4/4/1994",
    imageLocation: "",
  },
  {
    userId: "ID3",
    fullName: "Sally Sue",
    email: "Mike@Chavez.com",
    imageUrl: DEFAULT_IMG,
    birthday: "8/8/1988",
    imageLocation: "",
  },
];
