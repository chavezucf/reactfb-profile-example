import React, { useState } from "react";
import { LoginService } from "../Services/LoginService";
import "./Login.css";
import logo from "../images/profileLogoBlk.png";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth, }: {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [email, setEmail] = useState(""); //TODO
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const signIn = async () => {
    LoginService.SignIn(email,password)
    .then((userCredential) => {
      setIsAuth(true);
      navigate("/HomeFeed");
    })
    .catch((error) => {
      console.log("error" + error);
      setIsAuth(false);
      navigate("/HomeLogin");
    });
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="image_container">
          <img src={logo} />
        </div>
        <h2 className="active signIn"> Sign In </h2>
        {/* <h2 className="inactive underlineHover">Sign Up </h2> */}

        <form>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="email"
            placeholder="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="login"
            placeholder="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input
            type="button"
            className="fadeIn fourth"
            value="Log In"
            onClick={signIn}
          />
        </form>
      </div>
    </div>
  );
}

export default Login;
