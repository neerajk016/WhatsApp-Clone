import React from 'react'
import "./Login.css"
import {Button} from "@material-ui/core"
import {auth} from "./Firebase"
import { GoogleAuthProvider,signInWithPopup,} from "firebase/auth";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';



function Login() {
  const[{},dispatch]=useStateValue();
    const signin=()=>{
      const googleAuthProvider = new GoogleAuthProvider();
      signInWithPopup(auth, googleAuthProvider)
      .then((result)=>{
        // console.log(result);
        dispatch({
          type:actionTypes.SET_USER,
          user:result.user
        });
      })
      .catch((err)=>alert(err.message))
    }
  return (
    <div className='login'>
        <div className='login_container'>
            <img src='https://images.pexels.com/lib/api/pexels-white.png'/>
            <div className='login_text'>
                <h1>sign in with google</h1>
            </div>
            <Button onClick={signin}>
              sign in with google
            </Button>
        </div>
    </div>
  )
}

export default Login
