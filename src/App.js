import React, { useEffect } from 'react';
import HomeScreen from './screens/HomeScreen';
import './App.css';
import LoginScreen from './screens/LoginScreen'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { auth } from './Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';


function App() {
  //this value of user which is selector will give us back the user
  //if the user is connected then we will get access
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    //we're using a listener which takes a little bit of memory on our browser
    //if the component was ever to unmount we don't wanna duplicate another listener
    // that's why i'll use unsubscribe to detach the old one and attach the new one
    const unsubscribe = auth.onAuthStateChanged((userAuth) =>{
      if(userAuth) {
        //logged in
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
        })
        );
      }else{
        //logged out
        dispatch(logout());
      }
    });
    //now we won't worry about our performance
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
     {/* <HomeScreen /> */}
      <Router>
        {!user ? (
         <LoginScreen />
           ) : (
        <Routes>
          <Route exact path="/" element={<HomeScreen/>}/>
          <Route path='/profile' element={<ProfileScreen />} />
        </Routes>
   
       )}
      </Router>
    </div>
  );
}

export default App;
