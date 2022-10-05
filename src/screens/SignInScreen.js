import React, { useRef } from 'react';
import './SignInScreen.css';
import { auth } from "../Firebase";
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '../firebase';

function SignInScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        //we're not going to let page refresh every time we click a button
        e.preventDefault();

//         createUserWithEmailAndPassword(auth, "mail@mail.com", "password")
// .then((userCredential)=>{
//     console.log(userCredential)
// })
// .catch((error) => {
//     console.error(error.message);
// });

        
        auth
        .createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((authUser) =>{
            console.log(authUser);
        })
        .catch((error) =>{
            alert(error.message);
        });
    }
     
    const signIn = (e) => {
        e.preventDefault();

        auth
        .signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        )
        .then((authUser) =>{
            console.log(authUser);
        })
        .catch((error) =>{
            alert(error.message);
        });
    }


  return (
    <div className='signInScreen'>
        <form>
            <h1>Sign In</h1>
            <input ref={emailRef} placeholder='Email' type='email'  />
            <input ref={passwordRef} placeholder='Password' type='password'  />
            <button type='submit' onClick={signIn}>Sign In</button>
            <h4>
                <span className='signInScreen_gray'>New to Netflix? </span>
                <span className='signInScreen_link' onClick={register}>Sign Up now.</span>    
            </h4>
        </form>
    </div>
  )
}

export default SignInScreen