import React from 'react';
import { auth, provider } from "../Firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import './Login.css';
import logo from '../images/profileLogoBlk.png';



function Login({ setIsAuth }: { setIsAuth: React.Dispatch<React.SetStateAction<boolean>> }){
  const email = "macof2012@gmail.com";
  const password = "Test1234!"

  const signIn = () => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    setIsAuth(true);
    console.log("Success" + user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setIsAuth(false);
    console.log("error" + error);
  });
}

  return (
    <div className="wrapper fadeInDown">
      
  <div id="formContent">
    <div className='image_container'>
  <img src={logo} />
  </div>
    <h2 className="active"> Sign In </h2>
    {/* <h2 className="inactive underlineHover">Sign Up </h2> */}

    <form>
      <input type="text" 
            id="login" 
            className="fadeIn second" 
            name="email" 
            placeholder="email"
            value={email} />
      <input type="text" 
            id="password" 
            className="fadeIn third" 
            name="login" 
            placeholder="password"
            value={password} />
      <input type="button" 
          className="fadeIn fourth" 
          value="Log In" 
          onClick={signIn}/>
    </form>

  </div>
</div>
  );
}

export default Login;
